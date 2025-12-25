export default function ProjectCard({ project }) {
  let statusColor = "text-gray-700";
  if(project.status === "On Track") statusColor = "text-green-600";
  if(project.status === "At Risk") statusColor = "text-yellow-600";
  if(project.status === "Delayed") statusColor = "text-red-600";

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-semibold text-xl">{project.name}</h2>
      <p>Client: {project.client}</p>
      <p>Status: <span className={statusColor}>{project.status}</span></p>
    </div>
  )
}
