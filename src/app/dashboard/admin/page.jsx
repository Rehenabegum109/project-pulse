
'use client';
import { useEffect, useState } from 'react';

import axiosSecure from '@/utils/useAxios';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [missingCheckins, setMissingCheckins] = useState([]);
  const [highRisk, setHighRisk] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchMissingCheckins();
    fetchHighRisk();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axiosSecure.get('/admin/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchMissingCheckins = async () => {
    try {
      const res = await axiosSecure.get('/admin/projects/missing-checkins');
      setMissingCheckins(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchHighRisk = async () => {
    try {
      const res = await axiosSecure.get('/admin/projects/high-risk');
      setHighRisk(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Group projects by health status
  const grouped = projects.reduce((acc, p) => {
    const status = p.healthScore >= 80 ? 'On Track' : p.healthScore >= 60 ? 'At Risk' : 'Critical';
    acc[status] = acc[status] || [];
    acc[status].push(p);
    return acc;
  }, {});

  return (
    <div className="p-10  mt-5">
      
      {/* Projects by Health Status */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects by Health Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['On Track', 'At Risk', 'Critical'].map(status => (
            <div key={status} className={`p-4 rounded shadow ${status === 'On Track' ? 'bg-green-100' : status === 'At Risk' ? 'bg-yellow-100' : 'bg-red-100'}`}>
              <h3 className="font-semibold mb-2">{status}</h3>
              {grouped[status]?.length > 0 ? (
                <ul className="list-disc ml-5">
                  {grouped[status].map(p => (
                    <li key={p._id}>{p.name} ({p.healthScore})</li>
                  ))}
                </ul>
              ) : <p>No projects</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Missing Recent Check-ins */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects Missing Recent Check-ins</h2>
        {missingCheckins.length > 0 ? (
          <ul className="list-disc ml-6">
            {missingCheckins.map(p => (
              <li key={p._id}>{p.name}</li>
            ))}
          </ul>
        ) : <p>All projects have submitted recent check-ins.</p>}
      </section>

      {/* High-risk Projects */}
      <section>
        <h2 className="text-2xl font-bold mb-4">High-risk Projects Summary</h2>
        {highRisk.length > 0 ? (
          <ul className="list-disc ml-6">
            {highRisk.map(p => (
              <li key={p._id}>{p.name} (Health: {p.healthScore})</li>
            ))}
          </ul>
        ) : <p>No high-risk projects.</p>}
      </section>

    </div>
  );
}
