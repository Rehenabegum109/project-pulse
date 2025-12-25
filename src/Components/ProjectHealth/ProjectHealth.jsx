"use client";
import axiosSecure from "@/utils/useAxios";
import { useState, useEffect } from "react";


export default function ProjectHealth({ projectId }) {
  const [health, setHealth] = useState({ healthScore:0, status:"" });

  useEffect(() => {
    if(!projectId) return;
    const fetchHealth = async () => {
      const res = await axiosSecure.get(`/projects/${projectId}/health`);
      setHealth(res.data);
    };
    fetchHealth();
  }, [projectId]);

  return (
    <div className={`p-4 rounded text-white ${
      health.healthScore >= 80 ? "bg-green-500" :
      health.healthScore >= 60 ? "bg-yellow-500" : "bg-red-500"
    }`}>
      <h2 className="text-xl font-bold">Project Health Score: {health.healthScore}</h2>
      <p>Status: {health.status}</p>
    </div>
  );
}
