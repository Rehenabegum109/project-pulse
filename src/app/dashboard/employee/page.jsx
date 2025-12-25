// 'use client';

// import axiosSecure from "@/utils/useAxios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function EmployeeDashboardHome() {
 

// //   return (
// //     <div className="p-6 mt-10">
// //       <h1 className="text-3xl font-bold mb-4">Welcome Employee 👋</h1>
// //       <p className="mb-6 text-gray-700">Here is your Employee Dashboard Home.</p>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
// //           <h2 className="font-semibold mb-2">My Tasks</h2>
// //           <p>View your assigned tasks and progress</p>
// //         </div>
// //         <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
// //           <h2 className="font-semibold mb-2">Project Updates</h2>
// //           <p>Check project health and updates</p>
// //         </div>
// //         <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
// //           <h2 className="font-semibold mb-2">Weekly Check-ins</h2>
// //           <p>Submit your weekly progress reports</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

//  const [projects,setProjects] = useState([]);

//   useEffect(()=>{
//     const fetchProjects = async()=>{
//       const res = await axiosSecure.get("/api/projects");
//       setProjects(res.data);
//     }
//     fetchProjects();
//   },[]);

//   return (
//     <div className="p-4 mt-10">
//       <h1 className="text-3xl font-bold mb-4">My Projects</h1>
//       <ul className="space-y-2">
//         {projects.map(project=>(
//           <li key={project._id} className="border p-2 rounded hover:bg-gray-50">
//             <h2 className="font-semibold">{project.name}</h2>
//             <p>{project.description}</p>
//             <Link href={`/dashboard/employee/projects/${project._id}`} className="text-blue-500 underline">
//               Go to Project
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }


'use client';
import axiosSecure from "@/utils/useAxios";
import { useEffect, useState } from "react";


export default function EmployeeDashboard() {
  const [projects, setProjects] = useState([]);
  const [pendingCheckins, setPendingCheckins] = useState([]);
  const [openRisks, setOpenRisks] = useState([]);

  useEffect(() => {
    fetchAssignedProjects();
    fetchPendingCheckins();
    fetchOpenRisks();
  }, []);

  const fetchAssignedProjects = async () => {
    try {
      const res = await axiosSecure.get("/projects/assigned");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingCheckins = async () => {
    try {
      const res = await axiosSecure.get("/checkins/pending");
      setPendingCheckins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOpenRisks = async () => {
    try {
      const res = await axiosSecure.get("/risks");
      setOpenRisks(res.data.filter(r => r.status === "Open"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-8 mt-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Assigned Projects</h2>
        {projects.length ? (
          <ul className="list-disc ml-6">
            {projects.map(p => (
              <li key={p._id}>
                {p.name} ({p.status}) - Health: {p.healthScore}
              </li>
            ))}
          </ul>
        ) : <p>No assigned projects</p>}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pending Weekly Check-ins</h2>
        {pendingCheckins.length ? (
          <ul className="list-disc ml-6">
            {pendingCheckins.map(p => (
              <li key={p.projectId}>
                {p.projectName} (Week: {p.week})
              </li>
            ))}
          </ul>
        ) : <p>All check-ins submitted</p>}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Open Risks</h2>
        {openRisks.length ? (
          <ul className="list-disc ml-6">
            {openRisks.map(r => (
              <li key={r._id}>
                {r.title} - Severity: {r.severity} - Status: {r.status}
              </li>
            ))}
          </ul>
        ) : <p>No open risks</p>}
      </section>
    </div>
  );
}
