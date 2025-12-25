
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

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>No projects available.</p>;

  return (
    <div className="p-5 mt-10">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Project Name</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Client ID</th>
              <th className="border px-4 py-2 text-left">Employee IDs</th>
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
    </div>
  );
}

