
'use client';


import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import axiosSecure from "@/utils/useAxios";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/projects");
        setProjects(res.data || []);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const getHealthStatus = (score) => {
    if (score >= 80) return { text: "On Track", color: "bg-green-100 text-green-700" };
    if (score >= 60) return { text: "At Risk", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Critical", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option>All</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Critical</option>
          </select>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && filteredProjects.length === 0 && <p className="text-gray-500">No projects found.</p>}

        {!loading && filteredProjects.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-4">#</th>
                  <th className="p-4">Project Name</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Health Score</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => {
                  const health = getHealthStatus(project.healthScore || 0);

                  return (
                    <motion.tr
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 text-sm">{index + 1}</td>
                      <td className="p-4 font-medium">{project.name}</td>
                      <td className="p-4 text-sm">{project.client}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-sm rounded-full ${health.color}`}>{health.text}</span>
                      </td>
                      <td className={`p-4 font-semibold`}>{project.healthScore || 0}%</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-sm">View</button>
                          
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

