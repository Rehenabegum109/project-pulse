'use client';
import { useEffect, useState } from 'react';
import AdminDashboard from './admin/page';

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem('userRole');
    if (!r) window.location.href = '/login';
    setRole(r);
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-b from-blue-100 via-blue-100 to-white min-h-screen ">

      {role === 'admin' && (
        <>
        <AdminDashboard/>
        </>
      )}

      {role === 'employee' && (
        <>
          <h1 className="text-3xl font-bold">Welcome Employee 👷‍♂️</h1>
          <p>See your assigned tasks & projects</p>
        </>
      )}

      {role === 'client' && (
        <>
          <h1 className="text-3xl font-bold">Welcome Client 🤝</h1>
          <p>View project progress & give feedback</p>
        </>
      )}

    </div>
  );
}
