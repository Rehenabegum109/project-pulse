
// 'use client';
// import FeedbackButton from "@/Components/FeedbackButton";
// import axiosSecure from "@/utils/useAxios";
// import React, { useEffect, useState } from "react";


// export default function AssignedProjects() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await axiosSecure.get("/projects");
//         setProjects(res.data);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading projects...</p>;
//   if (!projects || projects.length === 0) return <p className="text-center mt-10">No projects assigned yet.</p>;

//   return (
//     <div className="p-4 md:p-6 mt-6">
//       <h1 className="text-2xl font-bold mb-4 md:mb-6">Assigned Projects</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">#</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Project Name</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Status</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Feedback</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {projects.map((project, index) => (
//               <tr key={project._id || project.name + index} className="hover:bg-gray-50 transition">
//                 <td className="px-3 py-2 text-sm md:text-base">{index + 1}</td>
//                 <td className="px-3 py-2 text-sm md:text-base font-medium">{project.name}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{project.status}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">
//                   {project._id && (
//                     <FeedbackButton
//                       projectId={project._id}
//                       onFeedbackSubmitted={() => console.log("Feedback submitted")}
//                     />
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/utils/useAxios";


export default function ClientProject() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Project</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                   <th className="p-2 border">Id</th>
                <th className="p-2 border">Project Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Health Score</th>
                <th className="p-2 border">Last Feedback</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{p._id}</td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.status}</td>
                  <td className="p-2 border">{p.healthScore || 100}</td>
                  <td className="p-2 border">
                    {p.lastFeedback ? p.lastFeedback.week : "No feedback yet"}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 rounded bg-green-600 text-white"
                      onClick={() => router.push(`/dashboard/client/feedback/${p._id}`)}
                    >
                      Submit Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

