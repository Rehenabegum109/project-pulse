'use client';

import axiosSecure from "@/utils/useAxios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CheckinForm() {
  const { projectId } = useParams();

  const [form, setForm] = useState({
    progressSummary: "",
    blockers: "",
    confidence: 3,
    completion: 0
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosSecure.post("/checkins", {
        projectId,
        progressSummary: form.progressSummary,
        blockers: form.blockers,
        confidenceLevel: Number(form.confidence),
        completionPercentage: Number(form.completion)
      });

      setSuccess("Check-in submitted successfully 🎉");

      setForm({
        progressSummary: "",
        blockers: "",
        confidence: 3,
        completion: 0
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 mt-10  md:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Check-in</h2>
      <p className="text-gray-600 mb-4">Project ID: <b>{projectId}</b></p>

      {success && <p className="mb-3 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 shadow-sm">

        <div>
          <label className="block font-medium mb-1">Progress Summary</label>
          <textarea
            required
            className="w-full border rounded p-2"
            rows={3}
            value={form.progressSummary}
            onChange={e => setForm({...form, progressSummary: e.target.value})}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Blockers / Challenges</label>
          <textarea
            className="w-full border rounded p-2"
            rows={2}
            value={form.blockers}
            onChange={e => setForm({...form, blockers: e.target.value})}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confidence Level (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            required
            className="border rounded p-2 w-24"
            value={form.confidence}
            onChange={e => setForm({...form, confidence: e.target.value})}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Estimated Completion %</label>
          <input
            type="number"
            min="0"
            max="100"
            required
            className="border rounded p-2 w-28"
            value={form.completion}
            onChange={e => setForm({...form, completion: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Check-in"}
        </button>
      </form>
    </div>
  );
}
