
// 'use client';

// import { useAuth } from '@/context/AuthContext';
// import axiosSecure from '@/utils/useAxios';
// import { useEffect, useState } from 'react';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// export default function ProjectsPage() {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editProject, setEditProject] = useState(null);
//   const [formData, setFormData] = useState({     name: '',
//     description: '',
//     client: '',
//     employees: [],
//     startDate: '',
//     endDate: '',
//     status: '',});

//   const fetchProjects = async () => {
//     try {
//       const res = await axiosSecure.get('/projects');
//       setProjects(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchProjects();
//   }, [user]);

//   const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editProject) await axiosSecure.put(`/projects/${editProject._id}`, formData);
//       else await axiosSecure.post('/projects', formData);
//       setShowForm(false);
//       setEditProject(null);
//       setFormData({ name: '', description: '', client: '', employees: [], startDate: '', endDate: '', status: '' });
//       fetchProjects();
//     } catch (err) {
//       console.error(err);
//       alert('Error');
//     }
//   };

//   const handleEdit = (p) => {
//     setEditProject(p);
//     setFormData({
//      name: p.name,
//       description: p.description,
//       client: p.client,
//       employees: p.employees || [],
//       startDate: new Date(p.startDate).toISOString().slice(0, 10),
//       endDate: new Date(p.endDate).toISOString().slice(0, 10),
//       status: p.status,
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete?')) return;
//     try {
//       await axiosSecure.delete(`/projects/${id}`);
//       fetchProjects();
//     } catch {
//       alert('Error');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!projects.length) return <p>No projects found</p>;

//   // --------- Health Progress Bar Component ---------
//   const HealthProgressBar = ({ score }) => {
//     const getColor = () => {
//       if (score > 75) return 'bg-green-500';
//       if (score > 50) return 'bg-yellow-500';
//       return 'bg-red-500';
//     };

//     const getStatus = () => {
//       if (score > 75) return 'Excellent';
//       if (score > 50) return 'Good';
//       return 'Poor';
//     };

//     return (
//       <div className="w-full bg-gradient-to-b from-blue-100 via-blue-100 to-white  rounded-full h-5 overflow-hidden shadow-inner relative">
//         <div
//           className={`${getColor()} h-5 rounded-full transition-all duration-500`}
//           style={{ width: `${score}%` }}
//         ></div>
//         <div className="absolute w-full text-center top-0 text-xs sm:text-sm font-semibold text-white">
//           {getStatus()}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mt-10 mb-4">Projects</h1>
//       <button
//         onClick={() => setShowForm(true)}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {editProject ? 'Edit Project' : 'Add Project'}
//       </button>

//       {/* Responsive Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded shadow mb-4">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 sm:p-3 border">Name</th>
//               <th className="p-2 sm:p-3 border">Client</th>
//               <th className="p-2 sm:p-3 border">Status</th>
//               <th className="p-2 sm:p-3 border">Health</th>
//               <th className="p-2 sm:p-3 border">Start</th>
//               <th className="p-2 sm:p-3 border">End</th>
//               <th className="p-2 sm:p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((p) => (
//               <tr key={p._id} className="hover:bg-gray-50 text-sm sm:text-base">
//                 <td className="p-2 sm:p-3 border">{p.name}</td>
//                 <td className="p-2 sm:p-3 border">{p.client}</td>
//                 <td className="p-2 sm:p-3 border">{p.status}</td>
//                 <td className="p-2 sm:p-3 border relative">
//                   <HealthProgressBar score={p.healthScore} />
//                 </td>
//                 <td className="p-2 sm:p-3 border">{new Date(p.startDate).toLocaleDateString()}</td>
//                 <td className="p-2 sm:p-3 border">{new Date(p.endDate).toLocaleDateString()}</td>
//                 <td className="p-2 sm:p-3 border flex gap-1 sm:gap-2">
//                   <button onClick={() => handleEdit(p)} className="text-blue-600 p-1 sm:p-2 rounded hover:bg-blue-100">
//                     <AiOutlineEdit />
//                   </button>
//                   <button onClick={() => handleDelete(p._id)} className="text-red-600 p-1 sm:p-2 rounded hover:bg-red-100">
//                     <AiOutlineDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">{editProject ? 'Edit Project' : 'Add Project'}</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 name="name"
//                 placeholder="Project Name"
//                 value={formData.name}
//                 onChange={handleInput}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 name="client"
//                 placeholder="Client Name"
//                 value={formData.client}
//                 onChange={handleInput}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInput}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInput}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => { setShowForm(false); setEditProject(null); }}
//                   className="px-4 py-2 rounded bg-gray-300"
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
//                   {editProject ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// 'use client';

// import { useAuth } from '@/context/AuthContext';
// import axiosSecure from '@/utils/useAxios';
// import { useEffect, useState } from 'react';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// export default function ProjectsPage() {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editProject, setEditProject] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     client: '',
//     employees: '',
//     startDate: '',
//     endDate: '',
//     status: 'On Track',
//     healthScore: 80
//   });

//   // Fetch projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axiosSecure.get('/projects');
//       setProjects(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchProjects();
//   }, [user]);

//   const handleInput = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Add/Edit Project
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//   name: formData.name.trim(),
//   description: formData.description.trim(),
//   startDate: formData.startDate,
//   endDate: formData.endDate,
//   clientId: formData.client.trim(), 
//   employeeIds: formData.employees
//     ? formData.employees.split(',').map(id => id.trim())
//     : []
// };

//     try {
//       if (editProject)
//         await axiosSecure.put(`/projects/${editProject._id}`, payload);
//       else
//         await axiosSecure.post('/projects', payload);

//       setShowForm(false);
//       setEditProject(null);
//       setFormData({
//         name: '',
//         description: '',
//         client: '',
//         employees: '',
//         startDate: '',
//         endDate: '',
//         status: 'On Track',
//         healthScore: 80
//       });

//       fetchProjects();
//     } catch (err) {
//       console.error(err);
//       alert('Error saving project');
//     }
//   };

//   const handleEdit = (p) => {
//     setEditProject(p);

//     setFormData({
//       name: p.name,
//       description: p.description || '',
//       client: p.client || '',
//       employees: p.employees?.join(',') || '',
//       startDate: p.startDate?.slice(0, 10) || '',
//       endDate: p.endDate?.slice(0, 10) || '',
//       status: p.status || 'On Track',
//       healthScore: p.healthScore || 80
//     });

//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete?')) return;
//     try {
//       await axiosSecure.delete(`/projects/${id}`);
//       fetchProjects();
//     } catch {
//       alert('Delete failed');
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!projects.length) return <p>No projects found</p>;

//   // Health Progress Bar
//   const HealthProgressBar = ({ score }) => {
//     const color =
//       score > 75 ? 'bg-green-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500';

//     return (
//       <div className="w-full bg-blue-100 rounded-full h-5 overflow-hidden shadow relative">
//         <div className={`${color} h-5`} style={{ width: `${score}%` }}></div>
//         <div className="absolute w-full text-center top-0 text-xs font-semibold text-white">
//           {score}%
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mt-10 mb-4">Projects</h1>

//       <button
//         onClick={() => setShowForm(true)}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {editProject ? 'Edit Project' : 'Add Project'}
//       </button>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Client ID</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Health</th>
//               <th className="p-2 border">Start</th>
//               <th className="p-2 border">End</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {projects.map((p) => (
//               <tr key={p._id}>
//                 <td className="p-2 border">{p.name}</td>
//                 <td className="p-2 border">{p.client}</td>
//                 <td className="p-2 border">{p.status}</td>
//                 <td className="p-2 border">
//                   <HealthProgressBar score={p.healthScore} />
//                 </td>
//                 <td className="p-2 border">{new Date(p.startDate).toLocaleDateString()}</td>
//                 <td className="p-2 border">{new Date(p.endDate).toLocaleDateString()}</td>
//                 <td className="p-2 border flex gap-2">
//                   <button onClick={() => handleEdit(p)}>
//                     <AiOutlineEdit />
//                   </button>
//                   <button onClick={() => handleDelete(p._id)}>
//                     <AiOutlineDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">
//               {editProject ? 'Edit Project' : 'Add Project'}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input name="name" value={formData.name} onChange={handleInput} placeholder="Project Name" className="border w-full p-2" />
//               <input name="description" value={formData.description} onChange={handleInput} placeholder="Description" className="border w-full p-2" />
//               <input name="client" value={formData.client} onChange={handleInput} placeholder="Client ID" className="border w-full p-2" />
//               <input name="employees" value={formData.employees} onChange={handleInput} placeholder="Employee IDs (comma separated)" className="border w-full p-2" />
//               <input type="date" name="startDate" value={formData.startDate} onChange={handleInput} className="border w-full p-2" />
//               <input type="date" name="endDate" value={formData.endDate} onChange={handleInput} className="border w-full p-2" />
//               <select name="status" value={formData.status} onChange={handleInput} className="border w-full p-2">
//                 <option>On Track</option>
//                 <option>At Risk</option>
//                 <option>Critical</option>
//                 <option>Completed</option>
//               </select>
//               <input type="number" name="healthScore" value={formData.healthScore} onChange={handleInput} min="0" max="100" className="border w-full p-2" />

//               <div className="flex justify-end gap-2">
//                 <button type="button" onClick={() => { setShowForm(false); setEditProject(null); }} className="px-4 py-2 bg-gray-300 rounded">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//                   {editProject ? 'Update' : 'Add'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/utils/useAxios';
import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    employees: '',
    startDate: '',
    endDate: '',
    status: 'On Track',
    healthScore: 80
  });

  const fetchProjects = async () => {
    try {
      const res = await axiosSecure.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add + Update merged
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      clientId: formData.client.trim(),
      employeeIds: formData.employees
        ? formData.employees.split(',').map(s => s.trim())
        : [],
      status: formData.status,
      healthScore: formData.healthScore
    };

    try {
      if (editProject) {
        await axiosSecure.put(`/projects/${editProject._id}`, payload);
      } else {
        await axiosSecure.post('/projects', payload);
      }

      setShowForm(false);
      setEditProject(null);
      setFormData({
        name: '',
        description: '',
        client: '',
        employees: '',
        startDate: '',
        endDate: '',
        status: 'On Track',
        healthScore: 80
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const handleEdit = (p) => {
    setEditProject(p);
    setFormData({
      name: p.name,
      description: p.description || '',
      client: p.client || '',
      employees: p.employees?.join(',') || '',
      startDate: p.startDate?.slice(0, 10) || '',
      endDate: p.endDate?.slice(0, 10) || '',
      status: p.status || 'On Track',
      healthScore: p.healthScore || 80
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await axiosSecure.delete(`/projects/${id}`);
      fetchProjects();
    } catch {
      alert('Delete failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  const HealthProgressBar = ({ score }) => {
    const color =
      score > 75 ? 'bg-green-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500';

    return (
      <div className="w-full bg-blue-100 rounded-full h-5 overflow-hidden shadow relative">
        <div className={`${color} h-5`} style={{ width: `${score}%` }}></div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mt-10 mb-4">Projects</h1>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editProject ? 'Edit Project' : 'Add Project'}
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Health</th>
              <th className="p-2 border">Start</th>
              <th className="p-2 border">End</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.client}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border">
                  <HealthProgressBar score={p.healthScore} />
                </td>
                <td className="p-2 border">
                  {new Date(p.startDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {new Date(p.endDate).toLocaleDateString()}
                </td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => handleEdit(p)}>
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(p._id)}>
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editProject ? 'Edit Project' : 'Add Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleInput}
                placeholder="Project Name"
                className="border w-full p-2"
                required
              />

              <input
                name="description"
                value={formData.description}
                onChange={handleInput}
                placeholder="Description"
                className="border w-full p-2"
                required
              />

              <input
                name="client"
                value={formData.client}
                onChange={handleInput}
                placeholder="Client ID"
                className="border w-full p-2"
                required
              />

              <input
                name="employees"
                value={formData.employees}
                onChange={handleInput}
                placeholder="Employee IDs (comma separated)"
                className="border w-full p-2"
              />

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInput}
                className="border w-full p-2"
                required
              />

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInput}
                className="border w-full p-2"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleInput}
                className="border w-full p-2"
              >
                <option>On Track</option>
                <option>At Risk</option>
                <option>Critical</option>
                <option>Completed</option>
              </select>

              <input
                type="number"
                name="healthScore"
                value={formData.healthScore}
                onChange={handleInput}
                min="0"
                max="100"
                className="border w-full p-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditProject(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editProject ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
