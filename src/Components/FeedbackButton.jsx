'use client';
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';

export default function FeedbackButton({ projectId, onFeedbackSubmitted }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
      >
        {open ? 'Close' : 'Give Feedback'}
      </button>

      {open && <FeedbackForm projectId={projectId} onSuccess={onFeedbackSubmitted} />}
    </div>
  );
}
