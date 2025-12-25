"use client";
import axiosSecure from "@/utils/useAxios";
import { useState, useEffect } from "react";


export default function EmployeeCheckIn({ projectId }) {
  const [checkins, setCheckins] = useState([]);
  const [form, setForm] = useState({ progress: "", blockers: "", confidence: 3, completion: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!projectId) return;
    const fetchCheckIns = async () => {
      const res = await axiosSecure.get(`/checkins/${projectId}`);
      setCheckins(res.data);
    };
    fetchCheckIns();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;

    await axiosSecure.post("/checkins", {
      projectId,
      progressSummary: form.progress,
      blockers: form.blockers,
      confidenceLevel: form.confidence,
      completionPercentage: form.completion,
    });

    setForm({ progress: "", blockers: "", confidence: 3, completion: 0 });
    const updated = await axiosSecure.get(`/checkins/${projectId}`);
    setCheckins(updated.data);
    setMessage("Check-in submitted!");
  };

  return (
    <div className="space-y-6">
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow">
        <textarea placeholder="Progress Summary" value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })} required className="w-full border p-2 rounded" />
        <textarea placeholder="Blockers" value={form.blockers} onChange={e => setForm({ ...form, blockers: e.target.value })} className="w-full border p-2 rounded" />
        <input type="number" min="1" max="5" value={form.confidence} onChange={e => setForm({ ...form, confidence: Number(e.target.value) })} placeholder="Confidence 1-5" className="w-full border p-2 rounded" />
        <input type="number" min="0" max="100" value={form.completion} onChange={e => setForm({ ...form, completion: Number(e.target.value) })} placeholder="Completion %" className="w-full border p-2 rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>

      <table className="min-w-full border border-gray-200 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Week</th>
            <th className="py-2 px-4 border-b">Progress</th>
            <th className="py-2 px-4 border-b">Blockers</th>
            <th className="py-2 px-4 border-b">Confidence</th>
            <th className="py-2 px-4 border-b">Completion %</th>
          </tr>
        </thead>
        <tbody>
          {checkins.map(c => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{c.week}</td>
              <td className="py-2 px-4 border-b">{c.progressSummary}</td>
              <td className="py-2 px-4 border-b">{c.blockers}</td>
              <td className="py-2 px-4 border-b">{c.confidenceLevel}</td>
              <td className="py-2 px-4 border-b">{c.completionPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
