export default function HowItWorks() {
  const steps = [
    "Admin creates projects",
    "Employees submit weekly check-ins",
    "Clients submit feedback"
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-semibold mb-6">How It Works</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow">
            <div className="text-blue-600 text-2xl font-bold">
              {index + 1}
            </div>
            <p className="mt-3 font-medium">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
