"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSecure from "@/utils/useAxios";

export default function AdminActivityTimeline() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [filterProject, setFilterProject] = useState("All");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axiosSecure.get("/admin/activity");
        setActivities(res.data);

       
        const uniqueProjects = [...new Set(res.data.map(a => a.projectName))];
        setProjects(uniqueProjects);
      } catch (err) {
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const typeColor = (type) => {
    switch (type) {
      case "Check-in": return "bg-blue-400 text-white";
      case "Client Feedback": return "bg-green-500 text-white";
      case "Risk": return "bg-red-500 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  const filteredActivities = activities.filter(a => 
    (filterType === "All" || a.type === filterType) &&
    (filterProject === "All" || a.projectName === filterProject)
  );

  if (loading) return <p className="text-center mt-10">Loading activities...</p>;
  if (!activities.length) return <p className="text-center mt-10">No activities found.</p>;

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-b from-blue-100 via-blue-100 to-white  mt-10 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Activity Timeline</h1>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="All">All Types</option>
          <option value="Check-in">Check-in</option>
          <option value="Client Feedback">Client Feedback</option>
          <option value="Risk">Risk</option>
        </select>

        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="All">All Projects</option>
          {projects.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`px-2 py-1 rounded ${typeColor(activity.type)} text-sm font-semibold`}>
                {activity.type}
              </span>
              <span className="text-gray-500 text-sm">{new Date(activity.date).toLocaleString()}</span>
            </div>
            <h2 className="font-semibold">{activity.projectName}</h2>
            <p className="text-gray-700 text-sm"><span className="font-semibold">User:</span> {activity.user}</p>
            <p className="text-gray-600 text-sm mt-1">{activity.details}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
