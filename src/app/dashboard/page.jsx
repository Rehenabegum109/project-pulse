'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem('userRole');
    if (!r) window.location.href = '/login';
    setRole(r);
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <div className="p-6 mt-20">

      {role === 'admin' && (
        <>
          <h1 className="text-3xl font-bold">Welcome Admin 👑</h1>
          <p>You have full system access</p>
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
