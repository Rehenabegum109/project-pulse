'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/utils/useAxios";


export default function FeedbackForm() {
  const { projectId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    satisfaction: 5,
    communication: 5,
    comments: "",
    flagIssue: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosSecure.post(`/projects/${projectId}/feedbacks`, {
        satisfactionRating: Number(form.satisfaction),
        communicationRating: Number(form.communication),
        comments: form.comments,
        flagIssue: form.flagIssue
      });

      setSuccess("Feedback submitted successfully 🎉");
      setForm({ satisfaction: 5, communication: 5, comments: "", flagIssue: false });
      setTimeout(() => router.push("/client/dashboard"), 1500);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Submit Weekly Feedback</h2>
      <p className="text-gray-600 mb-4">Project ID: <b>{projectId}</b></p>

      {success && <p className="mb-3 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 shadow-sm">
        <div>
          <label className="block font-medium mb-1">Satisfaction Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            required
            className="border rounded p-2 w-20"
            value={form.satisfaction}
            onChange={e => setForm({ ...form, satisfaction: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Communication Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            required
            className="border rounded p-2 w-20"
            value={form.communication}
            onChange={e => setForm({ ...form, communication: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Comments (optional)</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.flagIssue}
            onChange={e => setForm({ ...form, flagIssue: e.target.checked })}
          />
          <label>Flag an issue</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
