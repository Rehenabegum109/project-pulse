

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
    healthScore: 100
  });

  // Fetch projects
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

  // Add or Update Project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      client: formData.client.trim(),
      employees: formData.employees
        ? formData.employees.split(',').map(s => s.trim())
        : [],
      status: formData.status,
      healthScore: Number(formData.healthScore)
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
        healthScore: 100
      });

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      client: project.client || '',
      employees: project.employees?.join(',') || '',
      startDate: project.startDate?.slice(0, 10) || '',
      endDate: project.endDate?.slice(0, 10) || '',
      status: project.status || 'On Track',
      healthScore: project.healthScore || 100
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete project?')) return;
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
      <div className="w-full bg-blue-100 rounded-full h-5 overflow-hidden shadow">
        <div className={`${color} h-5`} style={{ width: `${score}%` }}></div>
      </div>
    );
  };

  return (
    // <div className="p-4 mt-10">
    //   <h1 className="text-2xl font-bold mb-4">Projects</h1>

    //   <button
    //     onClick={() => setShowForm(true)}
    //     className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
    //   >
    //     {editProject ? 'Edit Project' : 'Add Project'}
    //   </button>

    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-white border rounded shadow">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="p-2 border">Name</th>
    //           <th className="p-2 border">Client</th>
    //           <th className="p-2 border">Status</th>
    //           <th className="p-2 border">Health</th>
    //           <th className="p-2 border">Start</th>
    //           <th className="p-2 border">End</th>
    //           <th className="p-2 border">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {projects.map((p) => (
    //           <tr key={p._id}>
    //             <td className="p-2 border">{p.name}</td>
    //             <td className="p-2 border">{p.client}</td>
    //             <td className="p-2 border">{p.status}</td>
    //             <td className="p-2 border">
    //               <HealthProgressBar score={p.healthScore} />
    //             </td>
    //             <td className="p-2 border">{new Date(p.startDate).toLocaleDateString()}</td>
    //             <td className="p-2 border">{new Date(p.endDate).toLocaleDateString()}</td>
    //             <td className="p-2 border flex gap-2">
    //               <button onClick={() => handleEdit(p)}>
    //                 <AiOutlineEdit />
    //               </button>
    //               <button onClick={() => handleDelete(p._id)}>
    //                 <AiOutlineDelete />
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   {/* Modal Form */}
    //   {showForm && (
    //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    //       <div className="bg-white p-6 rounded shadow w-full max-w-md">
    //         <h2 className="text-xl font-bold mb-4">{editProject ? 'Edit Project' : 'Add Project'}</h2>

    //         <form onSubmit={handleSubmit} className="space-y-3">
    //           <input name="name" value={formData.name} onChange={handleInput} placeholder="Project Name" className="border w-full p-2" required />
    //           <input name="description" value={formData.description} onChange={handleInput} placeholder="Description" className="border w-full p-2" required />
    //           <input name="client" value={formData.client} onChange={handleInput} placeholder="Client ID" className="border w-full p-2" required />
    //           <input name="employees" value={formData.employees} onChange={handleInput} placeholder="Employee IDs (comma separated)" className="border w-full p-2" />
    //           <input type="date" name="startDate" value={formData.startDate} onChange={handleInput} className="border w-full p-2" required />
    //           <input type="date" name="endDate" value={formData.endDate} onChange={handleInput} className="border w-full p-2" required />
    //           <select name="status" value={formData.status} onChange={handleInput} className="border w-full p-2">
    //             <option>On Track</option>
    //             <option>At Risk</option>
    //             <option>Critical</option>
    //             <option>Completed</option>
    //           </select>
    //           <input type="number" name="healthScore" value={formData.healthScore} onChange={handleInput} min="0" max="100" className="border w-full p-2" />

    //           <div className="flex justify-end gap-2">
    //             <button type="button" onClick={() => { setShowForm(false); setEditProject(null); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
    //             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editProject ? 'Update' : 'Add'}</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="p-4 mt-10">
  <h1 className="text-2xl font-bold mb-4">Projects</h1>

  <button
    onClick={() => setShowForm(true)}
    className="mb-4 bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
  >
    {editProject ? 'Edit Project' : 'Add Project'}
  </button>

  {/* Desktop Table */}
  <div className="hidden sm:block overflow-x-auto">
    <table className="min-w-full bg-white border rounded shadow text-sm sm:text-base">
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
          <tr key={p._id} className="hover:bg-gray-50">
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">{p.client}</td>
            <td className="p-2 border">{p.status}</td>
            <td className="p-2 border"><HealthProgressBar score={p.healthScore} /></td>
            <td className="p-2 border">{new Date(p.startDate).toLocaleDateString()}</td>
            <td className="p-2 border">{new Date(p.endDate).toLocaleDateString()}</td>
            <td className="p-2 border flex gap-2">
              <button onClick={() => handleEdit(p)} className="p-1 bg-gray-200 rounded"><AiOutlineEdit /></button>
              <button onClick={() => handleDelete(p._id)} className="p-1 bg-red-200 rounded"><AiOutlineDelete /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Card View */}
  <div className="sm:hidden flex flex-col gap-4">
    {projects.map((p) => (
      <div key={p._id} className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{p.name}</h3>
          <div className="flex gap-2">
            <button onClick={() => handleEdit(p)} className="p-1 bg-gray-200 rounded"><AiOutlineEdit /></button>
            <button onClick={() => handleDelete(p._id)} className="p-1 bg-red-200 rounded"><AiOutlineDelete /></button>
          </div>
        </div>
        <p><span className="font-semibold">Client:</span> {p.client}</p>
        <p><span className="font-semibold">Status:</span> {p.status}</p>
        <p><span className="font-semibold">Start:</span> {new Date(p.startDate).toLocaleDateString()}</p>
        <p><span className="font-semibold">End:</span> {new Date(p.endDate).toLocaleDateString()}</p>
        <div className="mt-2">
          <span className="font-semibold">Health:</span>
          <HealthProgressBar score={p.healthScore} />
        </div>
      </div>
    ))}
  </div>

  {/* Modal Form */}
  {showForm && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{editProject ? 'Edit Project' : 'Add Project'}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" value={formData.name} onChange={handleInput} placeholder="Project Name" className="border w-full p-2 rounded" required />
          <input name="description" value={formData.description} onChange={handleInput} placeholder="Description" className="border w-full p-2 rounded" required />
          <input name="client" value={formData.client} onChange={handleInput} placeholder="Client ID" className="border w-full p-2 rounded" required />
          <input name="employees" value={formData.employees} onChange={handleInput} placeholder="Employee IDs (comma separated)" className="border w-full p-2 rounded" />
          <input type="date" name="startDate" value={formData.startDate} onChange={handleInput} className="border w-full p-2 rounded" required />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleInput} className="border w-full p-2 rounded" required />
          <select name="status" value={formData.status} onChange={handleInput} className="border w-full p-2 rounded">
            <option>On Track</option>
            <option>At Risk</option>
            <option>Critical</option>
            <option>Completed</option>
          </select>
          <input type="number" name="healthScore" value={formData.healthScore} onChange={handleInput} min="0" max="100" className="border w-full p-2 rounded" />

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button type="button" onClick={() => { setShowForm(false); setEditProject(null); }} className="px-4 py-2 bg-gray-300 rounded w-full sm:w-auto">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto">{editProject ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
}
