export default function Features() {
  const features = [
    "Project Health Dashboard",
    "Client Weekly Feedback",
    "Employee Check-ins",
    "Risk Tracking",
    "Timeline Activity",
    "Role-Based Access"
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-semibold mb-6">Key Features</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f} className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-semibold">{f}</h4>
            <p className="text-sm text-gray-600 mt-2">
              Manage & monitor your software projects efficiently.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
