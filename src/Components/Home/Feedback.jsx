// components/RecentFeedback.jsx
import React from "react";

const feedbacks = [
  {
    id: 1,
    name: "John Doe",
    project: "Website Redesign",
    rating: 5,
    message: "Great work! Delivered on time.",
    date: "22 Dec, 2025",
  },
  {
    id: 2,
    name: "Jane Smith",
    project: "Mobile App",
    rating: 4,
    message: "Good job, but a few bugs to fix.",
    date: "21 Dec, 2025",
  },
  {
    id: 3,
    name: "Ali Khan",
    project: "Landing Page",
    rating: 5,
    message: "Amazing design and smooth workflow!",
    date: "20 Dec, 2025",
  },
];

const Feedback = () => {
  return (
    <section className="p-6min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">Recent Feedback</h2>
        <p className="text-gray-600 mb-6">
          See what our clients are saying about your projects
        </p>

        {/* Feedback Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Client Info */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mr-3">
                  {fb.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{fb.name}</h3>
                  <p className="text-sm text-gray-500">{fb.project}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-2">
                {Array.from({ length: fb.rating }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400">★</span>
                ))}
                {Array.from({ length: 5 - fb.rating }).map((_, idx) => (
                  <span key={idx} className="text-gray-300">★</span>
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 mb-2">"{fb.message}"</p>

              {/* Date */}
              <p className="text-sm text-gray-400">{fb.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
