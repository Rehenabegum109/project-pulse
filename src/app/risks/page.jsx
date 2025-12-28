"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSecure from "@/utils/useAxios";

export default function AdminRiskCards() {
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRisks = async () => {
      try {
        const res = await axiosSecure.get("/admin/risks/all");
        setRisks(res.data);
      } catch (err) {
        console.error("Error fetching risks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRisks();
  }, []);

  const severityColor = (severity) => {
    switch (severity) {
      case "High": return "bg-red-500 text-white";
      case "Medium": return "bg-yellow-400 text-black";
      case "Low": return "bg-green-400 text-black";
      default: return "bg-gray-400 text-white";
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Open": return "bg-orange-400 text-green-900";
      case "Resolved": return "bg-green-500 text-green-900";
      default: return "bg-gray-400 text-white";
    }
  };

  if (loading) return <p className="text-center mt-10">Loading risks...</p>;
  if (!risks.length) return <p className="text-center mt-10">No risks found.</p>;

  return (
<div className="max-w-7xl mx-auto p-6 mt-10">
  <h1 className="text-3xl font-bold text-center mb-6">All Risks</h1>

  {/* Desktop Table */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="min-w-full bg-gradient-to-b from-blue-100 via-blue-100 to-white border border-gray-200">
      <thead className="bg-blue-100">
        <tr>
          <th className="px-4 py-2 border">Title</th>
          <th className="px-4 py-2 border">Project ID</th>
          <th className="px-4 py-2 border">Reported By</th>
          <th className="px-4 py-2 border">Mitigation Plan</th>
          <th className="px-4 py-2 border">Severity</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Created At</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((risk) => (
          <tr key={risk._id} className="text-center hover:bg-gray-50">
            <td className="px-4 py-2 border">{risk.title}</td>
            <td className="px-4 py-2 border">{risk.projectId}</td>
            <td className="px-4 py-2 border">{risk.employeeId}</td>
            <td className="px-4 py-2 border">{risk.mitigationPlan}</td>
            <td className={`px-4 py-2 border rounded ${severityColor(risk.severity)}`}>{risk.severity}</td>
            <td className={`px-4 py-2 border rounded ${statusColor(risk.status)}`}>{risk.status}</td>
            <td className="px-4 py-2 border">{new Date(risk.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Table */}
  <div className="sm:hidden space-y-4">
    {risks.map((risk) => (
      <div key={risk._id} className="bg-white p-4 rounded shadow border">
        <p className="font-semibold">Title: <span className="font-normal">{risk.title}</span></p>
        <p className="font-semibold">Project: <span className="font-normal">{risk.projectId}</span></p>
        <p className="font-semibold">Reported By: <span className="font-normal">{risk.employeeId}</span></p>
        <p className="font-semibold">Mitigation: <span className="font-normal">{risk.mitigationPlan}</span></p>
        <p className="font-semibold">
          Severity: <span className={`px-2 py-1 rounded ${severityColor(risk.severity)}`}>{risk.severity}</span>
        </p>
        <p className="font-semibold">
          Status: <span className={`px-2 py-1 rounded ${statusColor(risk.status)}`}>{risk.status}</span>
        </p>
        <p className="font-semibold">Created At: <span className="font-normal">{new Date(risk.createdAt).toLocaleDateString()}</span></p>
      </div>
    ))}
  </div>
</div>

  );
}
