import React, { useState } from "react";
import { Check, X, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // ✅ thêm Sidebar

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Team Invitation",
      content: "huybdse173401@fpt.edu.vn has invited you to a team",
      date: "1/15/2025, 5:30:00 PM",
      read: false,
    },
    {
      id: 2,
      title: "Project Evaluated",
      content: "Your project 'Smart Home IoT System' has been evaluated",
      date: "1/10/2025, 2:10:00 PM",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleAction = (id, action) => {
    if (action === "accept") alert(`Accepted invitation #${id}`);
    else if (action === "reject") alert(`Rejected invitation #${id}`);
    else if (action === "read") {
      setNotifications(
        notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAV */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 text-sm hover:underline"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleMarkAllRead}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Mark All Read
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto flex-1">
          <h1 className="text-xl font-semibold">Notifications</h1>
          <p className="text-sm text-gray-500 mb-4">
            {notifications.filter((n) => !n.read).length} unread notifications
          </p>

          {/* FILTER TABS */}
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            {["all", "unread", "read"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-2 text-sm capitalize ${
                  filter === tab
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "all"
                  ? `All (${notifications.length})`
                  : tab === "unread"
                  ? `Unread (${notifications.filter((n) => !n.read).length})`
                  : `Read (${notifications.filter((n) => n.read).length})`}
              </button>
            ))}
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-md border ${
                  n.read ? "bg-white" : "bg-blue-50"
                } flex justify-between items-center`}
              >
                <div>
                  <h3 className="font-medium text-gray-800 flex items-center gap-2">
                    <Check className="text-green-600 w-4 h-4" />
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{n.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                  <button className="text-blue-600 text-sm mt-1 hover:underline">
                    View Details →
                  </button>
                </div>

                <div className="flex gap-3">
                  <Check
                    onClick={() => handleAction(n.id, "accept")}
                    className="w-4 h-4 text-blue-600 cursor-pointer hover:scale-110"
                  />
                  <X
                    onClick={() => handleAction(n.id, "reject")}
                    className="w-4 h-4 text-red-600 cursor-pointer hover:scale-110"
                  />
                  <Circle
                    onClick={() => handleAction(n.id, "read")}
                    className={`w-4 h-4 cursor-pointer ${
                      n.read ? "text-gray-300" : "text-blue-600"
                    } hover:scale-110`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
