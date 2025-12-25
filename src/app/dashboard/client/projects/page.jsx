
// 'use client';

// import axiosSecure from "@/utils/useAxios";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const AssignedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const parts = dateStr.split("-");
//     if (parts.length !== 3) return "N/A";
//     const [year, month, day] = parts;
//     const date = new Date(Number(year), Number(month) - 1, Number(day));
//     return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
//   };

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

//   if (!projects || projects.length === 0)
//     return (
//       <p className="text-center mt-10">
//         No projects assigned yet.
//       </p>
//     );

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
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Start Date</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">End Date</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Health Score</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Action</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {projects.map((project, index) => (
//               <tr key={project.id || project.name + index} className="hover:bg-gray-50 transition">
//                 <td className="px-3 py-2 text-sm md:text-base">{index + 1}</td>
//                 <td className="px-3 py-2 text-sm md:text-base font-medium">{project.name}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{project.status}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{formatDate(project.startDate)}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{formatDate(project.endDate)}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">
//                   <div className="w-full bg-gray-200 h-3 rounded mb-1">
//                     <div
//                       className="bg-blue-500 h-3 rounded"
//                       style={{ width: `${project.healthScore || 0}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-xs md:text-sm text-gray-600">{project.healthScore || 0}%</span>
//                 </td>
//                 <td className="px-3 py-2 text-sm md:text-base">
//            <Link href={`/client/project/${project._id}`}>
//   <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
//     View Details
//   </button>
// </Link>

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignedProjects;

// 'use client';

// import axiosSecure from "@/utils/useAxios";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// const AssignedProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const parts = dateStr.split("-");
//     if (parts.length !== 3) return "N/A";
//     const [year, month, day] = parts;
//     const date = new Date(Number(year), Number(month) - 1, Number(day));
//     return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
//   };

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
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Start Date</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">End Date</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Health Score</th>
//               <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Feedback</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {projects.map((project, index) => (
//               <tr key={project._id || project.name + index} className="hover:bg-gray-50 transition">
//                 <td className="px-3 py-2 text-sm md:text-base">{index + 1}</td>
//                 <td className="px-3 py-2 text-sm md:text-base font-medium">{project.name}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{project.status}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{formatDate(project.startDate)}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">{formatDate(project.endDate)}</td>
//                 <td className="px-3 py-2 text-sm md:text-base">
//                   <div className="w-full bg-gray-200 h-3 rounded mb-1">
//                     <div
//                       className="bg-blue-500 h-3 rounded"
//                       style={{ width: `${project.healthScore || 0}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-xs md:text-sm text-gray-600">{project.healthScore || 0}%</span>
//                 </td>
//                 <td className="px-3 py-2 text-sm md:text-base">
//        {project._id && (
//   <Link href={`/client/project/${project._id}/feedback`}>
//     <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
//       Give Feedback
//     </button>
//   </Link>
// )}

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignedProjects;

'use client';
import FeedbackButton from "@/Components/FeedbackButton";
import axiosSecure from "@/utils/useAxios";
import React, { useEffect, useState } from "react";


export default function AssignedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;
  if (!projects || projects.length === 0) return <p className="text-center mt-10">No projects assigned yet.</p>;

  return (
    <div className="p-4 md:p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-6">Assigned Projects</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">#</th>
              <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Project Name</th>
              <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Status</th>
              <th className="px-3 py-2 text-left text-gray-700 text-sm md:text-base">Feedback</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project, index) => (
              <tr key={project._id || project.name + index} className="hover:bg-gray-50 transition">
                <td className="px-3 py-2 text-sm md:text-base">{index + 1}</td>
                <td className="px-3 py-2 text-sm md:text-base font-medium">{project.name}</td>
                <td className="px-3 py-2 text-sm md:text-base">{project.status}</td>
                <td className="px-3 py-2 text-sm md:text-base">
                  {project._id && (
                    <FeedbackButton
                      projectId={project._id}
                      onFeedbackSubmitted={() => console.log("Feedback submitted")}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
