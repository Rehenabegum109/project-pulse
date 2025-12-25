'use client';

export default function ClientDashboard() {
 

  return (
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Client 👋</h1>
      <p className="mb-6 text-gray-700">Here is your Employee Dashboard Home.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">My Tasks</h2>
          <p>View your assigned tasks and progress</p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Project Updates</h2>
          <p>Check project health and updates</p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Weekly Check-ins</h2>
          <p>Submit your weekly progress reports</p>
        </div>
      </div>
    </div>
  );
}
