// 'use client';

// import axiosSecure from "@/utils/useAxios";
// import { useEffect, useState } from "react";

// export default function PendingCheckins() {
//   const [pending, setPending] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/employee/checkins/pending")
//       .then(res => setPending(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="p-4 md:p-8 mt-10">
//       <h2 className="text-xl font-semibold mb-4">
//         Pending Check-ins
//       </h2>

//       {pending.length === 0 && (
//         <p className="text-green-600 font-medium">
//           All done 🎉
//         </p>
//       )}

//       {/* Table for Desktop */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="min-w-full border rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left border">Project</th>
//               <th className="p-3 text-left border">Week</th>
//             </tr>
//           </thead>

//           <tbody>
//             {pending.map(p => (
//               <tr key={p.projectId} className="hover:bg-gray-50">
//                 <td className="p-3 border">{p.projectName}</td>
//                 <td className="p-3 border">{p.week}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Card layout for Mobile */}
//       <div className="md:hidden space-y-3">
//         {pending.map(p => (
//           <div 
//             key={p.projectId}
//             className="border rounded-lg p-3 shadow-sm"
//           >
//             <p className="font-medium">
//               {p.projectName}
//             </p>
//             <p className="text-sm text-gray-600">
//               Week: {p.week}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/utils/useAxios";

export default function PendingCheckins() {

  const router = useRouter();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    axiosSecure.get("/employee/checkins/pending")
      .then(res => setPending(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Pending Check-ins
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Project Name</th>
              <th className="p-2 border">Week</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {pending.map((p) => (
              <tr key={p.projectId}>
                <td className="p-2 border">{p.projectName}</td>
                <td className="p-2 border">{p.week}</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white"
                    onClick={() =>
                      router.push(`/dashboard/employee/pending-checking/${p.projectId}`)
                    }
                  >
                    Submit Check-in
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
