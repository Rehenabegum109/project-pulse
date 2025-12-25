"use client";
import axiosSecure from "@/utils/useAxios";
import { useState, useEffect } from "react";


export default function EmployeeRisks({ projectId }) {
  const [risks, setRisks] = useState([]);
  const [form, setForm] = useState({ title: "", severity: "Low", mitigationPlan: "", status: "Open" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRisks = async () => {
      const res = await axiosSecure.get("/risks");
      setRisks(res.data);
    };
    fetchRisks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!projectId) return;

    await axiosSecure.post("/risks", { ...form, projectId });
    setForm({ title: "", severity: "Low", mitigationPlan: "", status: "Open" });
    const res = await axiosSecure.get("/risks");
    setRisks(res.data);
    setMessage("Risk submitted!");
  };

  return (
    <div className="space-y-4">
      {message && <p className="text-green-600">{message}</p>}

      {/* Risk Form */}
      <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border p-2 rounded" required />
        <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="w-full border p-2 rounded">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <textarea placeholder="Mitigation Plan" value={form.mitigationPlan} onChange={e => setForm({ ...form, mitigationPlan: e.target.value })} className="w-full border p-2 rounded" required />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border p-2 rounded">
          <option>Open</option>
          <option>Resolved</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit Risk</button>
      </form>

      {/* Risk Table */}
      <table className="min-w-full border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Severity</th>
            <th className="py-2 px-4 border-b">Mitigation Plan</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {risks.map(r => (
            <tr key={r._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{r.title}</td>
              <td className="py-2 px-4 border-b">{r.severity}</td>
              <td className="py-2 px-4 border-b">{r.mitigationPlan}</td>
              <td className="py-2 px-4 border-b">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
