import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { Trash2, Plus } from "lucide-react";

export default function CreateTeam() {
  const [members, setMembers] = useState([
    {
      email: "huybdse173401@fpt.edu.vn",
      status: "ACCEPTED",
      role: "LEADER",
    },
    {
      email: "locntse161090@fpt.edu.vn",
      status: "ACCEPTED",
      role: "",
    },
    {
      email: "anhtdse150629@fpt.edu.vn",
      status: "WAITING",
      role: "",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleAdd = () => {
    if (!newEmail.trim()) return;
    setMembers([
      ...members,
      { email: newEmail.trim(), status: "WAITING", role: "" },
    ]);
    setNewEmail("");
    setShowPopup(false);
  };

  const handleDelete = (email) => {
    setMembers(members.filter((m) => m.email !== email));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "WAITING":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h1 className="text-2xl font-semibold">Create Team</h1>
            <p className="text-gray-500 text-sm">Create team for your project</p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" /> New Member
            </button>

            {showPopup && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg p-4 w-64">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 mb-2 text-sm"
                />
                <button
                  onClick={handleAdd}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4 max-w-3xl">
          {members.map((m) => (
            <div
              key={m.email}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <span>{m.email}</span>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                    m.status
                  )}`}
                >
                  {m.status}
                </span>
                {m.role && (
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">
                    {m.role}
                  </span>
                )}
                <button
                  onClick={() => handleDelete(m.email)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
