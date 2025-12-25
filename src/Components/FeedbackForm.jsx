// 'use client';
// import axiosSecure from '@/utils/useAxios';
// import { useState } from 'react';


// export default function FeedbackForm({ projectId }) {
//   const [comment, setComment] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment) return;

//     try {
//       const res = await axiosSecure.post(`/projects/${projectId}/feedbacks`, { comment });

//       if (res.status === 201) {
//         setMessage('Feedback submitted successfully!');
//         setComment('');
//       } else {
//         setMessage(res.data?.error || 'Failed to submit feedback');
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.error || 'Something went wrong');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Write your feedback..."
//         className="border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//       >
//         Submit
//       </button>
//       {message && <p className="text-sm text-gray-600">{message}</p>}
//     </form>
//   );
// }


'use client';
import { useState } from 'react';
import axiosSecure from '@/utils/useAxios';

export default function FeedbackForm({ projectId, onSuccess }) {
  const [satisfaction, setSatisfaction] = useState(3);
  const [communication, setCommunication] = useState(3);
  const [comments, setComments] = useState('');
  const [flagIssue, setFlagIssue] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comments && !flagIssue) {
      setMessage("Please add a comment or flag an issue");
      return;
    }

    try {
      const res = await axiosSecure.post(`/projects/${projectId}/feedbacks`, {
        satisfaction,
        communication,
        comments,
        flagIssue
      });

      if (res.status === 201) {
        setMessage('Feedback submitted successfully!');
        setSatisfaction(3);
        setCommunication(3);
        setComments('');
        setFlagIssue(false);
        if (onSuccess) onSuccess(res.data.feedback);
      } else {
        setMessage(res.data?.error || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2 border p-4 rounded bg-gray-50">
      <h3 className="font-semibold text-lg">Client Weekly Feedback</h3>

      <label>
        Satisfaction rating (1–5):
        <select
          value={satisfaction}
          onChange={(e) => setSatisfaction(Number(e.target.value))}
          className="border p-1 rounded ml-2"
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>

      <label>
        Communication clarity rating (1–5):
        <select
          value={communication}
          onChange={(e) => setCommunication(Number(e.target.value))}
          className="border p-1 rounded ml-2"
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>

      <label>
        Optional comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add any additional feedback..."
          className="border p-2 rounded w-full mt-1"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={flagIssue}
          onChange={(e) => setFlagIssue(e.target.checked)}
        />
        Flag an issue
      </label>

      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
      >
        Submit
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}
