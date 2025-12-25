"use client";
import EmployeeCheckIn from "@/Components/EmployeeCheckIn/EmployeeCheckin";
import EmployeeRisks from "@/Components/EmployeeRisks/EmployeeRisks";
import ProjectHealth from "@/Components/ProjectHealth/ProjectHealth";
import axiosSecure from "@/utils/useAxios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) return setError("Project ID missing");

    const fetchProject = async () => {
      try {
        const res = await axiosSecure.get(`/projects/${projectId}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Project not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p>{project.description}</p>

      <ProjectHealth projectId={projectId} />
      <EmployeeCheckIn projectId={projectId} />
      <EmployeeRisks projectId={projectId} />
    </div>
  );
}
