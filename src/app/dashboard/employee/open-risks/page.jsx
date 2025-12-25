// "use client";
// import axiosSecure from "@/utils/useAxios";
// import { useEffect, useState } from "react";


// export default function OpenRisksPage() {
//   const [projects, setProjects] = useState([]);
//   const [risks, setRisks] = useState({});

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const res = await axiosSecure.get("/projects");
//         setProjects(res.data);

//         const risksData = {};
//         await Promise.all(res.data.map(async (p) => {
//           const r = await axiosSecure.get(`/projects/${p._id}/open-risks`);
//           risksData[p._id] = r.data.openRisks;
//         }));
//         setRisks(risksData);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchProjects();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Open Risks</h1>
//       {projects.length === 0 ? (
//         <p className="text-gray-500 mt-2">No projects assigned</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projects.map(p => (
//             <div key={p._id} className="p-4 bg-white shadow rounded border">
//               <h2 className="font-semibold">{p.name}</h2>
//               <p className="mt-2 text-red-500 font-bold">Open Risks: {risks[p._id] || 0}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import axiosSecure from "@/utils/useAxios";
import { useState } from "react";


export default function AddRiskPage({ projectId }) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [mitigationPlan, setMitigationPlan] = useState("");
  const [status, setStatus] = useState("Open");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/risks", {
        projectId,
        title,
        severity,
        mitigationPlan,
        status
      });
      setMessage("Risk submitted successfully");
      setTitle(""); setSeverity("Low"); setMitigationPlan(""); setStatus("Open");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting risk");
    }
  };

  return (
    <div className="p-6 mt-10 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Submit Risk</h1>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Severity</label>
          <select
            value={severity}
            onChange={e => setSeverity(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Mitigation Plan</label>
          <textarea
            value={mitigationPlan}
            onChange={e => setMitigationPlan(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Open</option>
            <option>Resolved</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit Risk
        </button>
      </form>
    </div>
  );
}
