'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProjectPage() {
  const { id } = useParams(); // project id
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/projects/${id}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Feedback submitted successfully!");
        setComment("");
      } else {
        setMessage(data.error || "Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project {id}</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full border p-2 rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
