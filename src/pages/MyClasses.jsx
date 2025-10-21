import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MyClasses() {
  const navigate = useNavigate();

  const [year, setYear] = useState("2025");
  const [semester, setSemester] = useState("Spring");
  const [classFilter, setClassFilter] = useState("All Classes");

  const classList = [
    {
      id: 1,
      name: "IoT Fundamentals",
      desc: "Introduction to Internet of Things concepts, protocols, and standards.",
      semester: "Spring 2025",
      students: 28,
      projects: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "IoT Applications",
      desc: "Real-world IoT applications and case studies.",
      semester: "Spring 2025",
      students: 25,
      projects: 18,
      status: "Active",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b bg-white flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-2xl font-semibold">My Classes</h1>
        </div>

        <div className="p-8 overflow-auto">
          <p className="text-gray-500 mb-4">
            Manage your assigned classes and student projects
          </p>

          {/* --- FILTER SECTION --- */}
          <div className="bg-white border rounded-lg p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Class Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Dropdown */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                </select>
              </div>

              {/* Semester Dropdown */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                </select>
              </div>

              {/* Class Dropdown */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Class</label>
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Classes</option>
                  <option>IoT Fundamentals</option>
                  <option>IoT Applications</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- CLASSES LIST --- */}
          <div className="bg-white border rounded-lg divide-y">
            <div className="grid grid-cols-6 gap-4 px-6 py-3 text-xs font-semibold text-gray-500">
              <div className="col-span-2">Class Name</div>
              <div>Semester</div>
              <div>Students</div>
              <div>Projects</div>
              <div>Status</div>
            </div>

            {classList
              .filter(
                (c) =>
                  classFilter === "All Classes" ||
                  c.name === classFilter
              )
              .map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-6 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition"
                >
                  <div className="col-span-2">
                    <h4 className="font-medium text-gray-900">{c.name}</h4>
                    <p className="text-gray-500 text-sm">{c.desc}</p>
                  </div>
                  <div className="text-gray-700 text-sm">{c.semester}</div>
                  <div className="text-gray-700 text-sm">{c.students}</div>
                  <div className="text-gray-700 text-sm">{c.projects}</div>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      {c.status}
                    </span>
                    <button
                      onClick={() => navigate(`/class/${c.id}`)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Projects
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
