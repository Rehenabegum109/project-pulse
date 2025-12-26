

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/utils/useAxios";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get("/projects"); 
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="p-4">Loading projects...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (projects.length === 0) return <p className="p-4">No projects available.</p>;

  return (
    <div className="p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Project Name</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Client ID</th>
              <th className="border px-4 py-2 text-left">Employees</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/feedback/${project._id}`)}
              >
                <td className="border px-4 py-2">{project.name}</td>
                <td className="border px-4 py-2">{project.status || "N/A"}</td>
                <td className="border px-4 py-2">{project.client}</td>
                <td className="border px-4 py-2">
                  {project.employees?.length > 0 ? project.employees.join(", ") : "No employees"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/feedback/${project._id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p>
              <span className="font-medium">Status:</span> {project.status || "N/A"}
            </p>
            <p>
              <span className="font-medium">Client ID:</span> {project.client}
            </p>
            <p>
              <span className="font-medium">Employees:</span>{" "}
              {project.employees?.length > 0 ? project.employees.join(", ") : "No employees"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
