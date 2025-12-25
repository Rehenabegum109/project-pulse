"use client";
import axiosSecure from "@/utils/useAxios";
import { useState, useEffect } from "react";

export default function ClientFeedback({ projectId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    satisfaction: 3,
    communication: 3,
    comments: "",
    flagIssue: false,
  });
  const [message, setMessage] = useState("");

  const confidenceColor = (level) =>
    level <= 2 ? "bg-red-500" : level === 3 ? "bg-yellow-500" : "bg-green-500";

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await axiosSecure.get(`/api/feedbacks/${projectId}`);
      setFeedbacks(res.data);
    };
    fetchFeedbacks();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/api/feedbacks", {
        projectId,
        satisfactionRating: form.satisfaction,
        communicationRating: form.communication,
        comments: form.comments,
        flagIssue: form.flagIssue,
      });
      setMessage(res.data.message);
      setForm({ satisfaction: 3, communication: 3, comments: "", flagIssue: false });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting feedback");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Client Weekly Feedback</h1>
      {message && <p className="text-green-600">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow">
        <input
          type="number"
          min="1"
          max="5"
          value={form.satisfaction}
          onChange={(e) => setForm({ ...form, satisfaction: Number(e.target.value) })}
          placeholder="Satisfaction Rating (1-5)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          value={form.communication}
          onChange={(e) => setForm({ ...form, communication: Number(e.target.value) })}
          placeholder="Communication Clarity Rating (1-5)"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Comments (optional)"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.flagIssue}
            onChange={(e) => setForm({ ...form, flagIssue: e.target.checked })}
          />
          <span>Flag Issue</span>
        </label>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Submit Feedback
        </button>
      </form>

      {/* Table */}
      <section className="overflow-x-auto p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">Your Submitted Feedback</h2>
        <table className="min-w-full border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Week</th>
              <th className="py-2 px-4 border-b">Satisfaction</th>
              <th className="py-2 px-4 border-b">Communication</th>
              <th className="py-2 px-4 border-b">Comments</th>
              <th className="py-2 px-4 border-b">Flag Issue</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{f.week}</td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`px-2 py-1 rounded text-white ${confidenceColor(f.satisfactionRating)}`}>
                    {f.satisfactionRating}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <span className={`px-2 py-1 rounded text-white ${confidenceColor(f.communicationRating)}`}>
                    {f.communicationRating}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{f.comments}</td>
                <td className="py-2 px-4 border-b text-center">
                  {f.flagIssue ? <span className="text-red-600 font-bold">⚠️</span> : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
