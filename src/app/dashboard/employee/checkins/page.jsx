"use client";

import axiosSecure from "@/utils/useAxios";
import { useState, useEffect } from "react";

export default function EmployeeCheckIn({ projectId }) {
  const [checkins, setCheckins] = useState([]);
  const [form, setForm] = useState({
    progress: "",
    blockers: "",
    confidence: 3,
    completion: 0,
  });
  const [message, setMessage] = useState("");

  const confidenceColor = (level) =>
    level <= 2 ? "bg-red-500" : level === 3 ? "bg-yellow-500" : "bg-green-500";

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const res = await axiosSecure.get(`/checkins/${projectId}`);
        setCheckins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCheckIns();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/checkins", {
        projectId,
        progressSummary: form.progress,
        blockers: form.blockers,
        confidenceLevel: form.confidence,
        completionPercentage: form.completion,
      });
      setMessage(res.data.message || "Check-in submitted");
      setForm({ progress: "", blockers: "", confidence: 3, completion: 0 });
      // Refresh checkins after submission
      const updated = await axiosSecure.get(`/api/checkins/${projectId}`);
      setCheckins(updated.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting check-in");
    }
  };

  return (
    <div className="p-4 mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Employee Weekly Check-In</h1>
      {message && <p className="text-green-600">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow">
        <textarea
          placeholder="Progress Summary"
          value={form.progress}
          onChange={(e) => setForm({ ...form, progress: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Blockers / Challenges"
          value={form.blockers}
          onChange={(e) => setForm({ ...form, blockers: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={form.confidence}
          onChange={(e) => setForm({ ...form, confidence: Number(e.target.value) })}
          placeholder="Confidence Level (1-5)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          min="0"
          max="100"
          value={form.completion}
          onChange={(e) => setForm({ ...form, completion: Number(e.target.value) })}
          placeholder="Completion %"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit Check-In
        </button>
      </form>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">Your Weekly Check-Ins</h2>
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
            {checkins.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{c.week}</td>
                <td className="py-2 px-4 border-b">{c.progressSummary}</td>
                <td className="py-2 px-4 border-b">{c.blockers}</td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`px-2 py-1 rounded text-white ${confidenceColor(c.confidenceLevel)}`}>
                    {c.confidenceLevel}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${c.completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-sm">{c.completionPercentage}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        {checkins.map((c) => (
          <div key={c._id} className="border rounded p-4 shadow hover:shadow-lg">
            <p>
              <span className="font-semibold">Week:</span> {c.week}
            </p>
            <p>
              <span className="font-semibold">Progress:</span> {c.progressSummary}
            </p>
            <p>
              <span className="font-semibold">Blockers:</span> {c.blockers || "-"}
            </p>
            <p>
              <span className="font-semibold">Confidence:</span>{" "}
              <span className={`px-2 py-1 rounded text-white ${confidenceColor(c.confidenceLevel)}`}>
                {c.confidenceLevel}
              </span>
            </p>
            <p>
              <span className="font-semibold">Completion:</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${c.completionPercentage}%` }}
                />
              </div>
              <span className="text-sm">{c.completionPercentage}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
