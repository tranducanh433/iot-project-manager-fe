import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, [navigate]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <p className="text-gray-500 text-sm">
              Manage your IoT project submissions
            </p>
          </div>

          <button
            onClick={() => navigate("/create-team")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Create Team
          </button>
        </div>

        <div className="p-8 overflow-auto">
          <div className="space-y-4 max-w-4xl">
            <ProjectCard
              title="Smart Home IoT System"
              course="IoT Fundamentals"
              date="1/15/2025"
              status="Evaluated"
              statusColor="bg-blue-100 text-blue-700"
            />
            <ProjectCard
              title="Weather Monitoring Station"
              course="Sensor Networks"
              date="1/18/2025"
              status="Submitted"
              statusColor="bg-green-100 text-green-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, course, date, status, statusColor }) {
  return (
    <div className="bg-white border rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">{course}</p>
        <p className="text-gray-400 text-xs">Submitted {date}</p>
      </div>

      <div className="flex items-center space-x-4">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}
        >
          {status}
        </span>
        <a href="#" className="text-blue-600 text-sm hover:underline">
          View
        </a>
        <a href="#" className="text-blue-600 text-sm hover:underline">
          Edit
        </a>
      </div>
    </div>
  );
}
