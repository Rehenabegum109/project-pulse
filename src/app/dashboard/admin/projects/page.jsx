'use client';
import { useAuth } from '@/context/AuthContext';
import axiosSecure from '@/utils/useAxios';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // -----------------------------
  // FETCH PROJECTS
  // -----------------------------
  const fetchProjects = async () => {
    try {
      if (!isAuthenticated) return;
      const res = await axiosSecure.get('/projects');
      const updatedProjects = await Promise.all(
        res.data.map(async p => {
          // Calculate Health Score
          const healthRes = await axiosSecure.get(`/projects/${p._id}/health`);
          return { ...p, ...healthRes.data };
        })
      );
      setProjects(updatedProjects);
    } catch (err) {
      console.error('Fetch error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [isAuthenticated]);

  // -----------------------------
  // UPDATE PROJECT
  // -----------------------------
  const handleUpdate = async () => {
    try {
      if (user?.role !== 'admin') return;
      const { _id, ...updateData } = selectedProject;
      const res = await axiosSecure.put(`/projects/${_id}`, updateData);
      setProjects(prev => prev.map(p => (p._id === _id ? res.data : p)));
      setIsEditOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
    }
  };

  // -----------------------------
  // DELETE PROJECT
  // -----------------------------
  const handleDelete = async id => {
    if (!confirm('Delete this project?')) return;
    if (user?.role !== 'admin') return;
    try {
      await axiosSecure.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Projects</h1>

      {!isAuthenticated && <p>Please login to see projects.</p>}

      {isAuthenticated && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Health</th>
                {user?.role === 'admin' && <th className="px-6 py-4 text-center">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan={user?.role === 'admin' ? 8 : 7} className="px-6 py-6 text-center text-gray-400">
                    No projects found
                  </td>
                </tr>
              )}

              {projects.map(p => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={p.image || '/default-project.png'}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                  <td className="px-6 py-4">{p.description}</td>
                  <td className="px-6 py-4">{new Date(p.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(p.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === 'On Track' ? 'bg-green-100 text-green-700' :
                      p.status === 'At Risk' ? 'bg-yellow-100 text-yellow-700' :
                      p.status === 'Critical' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: `${p.healthScore}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{p.healthScore}%</span>
                    </div>
                  </td>
                  {user?.role === 'admin' && (
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => { setSelectedProject(p); setIsEditOpen(true); }}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="font-bold mb-4 text-gray-800">Edit Project</h2>
            <input
              value={selectedProject.name}
              onChange={e => setSelectedProject({...selectedProject, name: e.target.value})}
              className="border p-2 w-full mb-3 rounded"
              placeholder="Project Name"
            />
            <textarea
              value={selectedProject.description}
              onChange={e => setSelectedProject({...selectedProject, description: e.target.value})}
              className="border p-2 w-full mb-3 rounded"
              placeholder="Project Description"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
