import React from "react";
import Sidebar from "../components/Sidebar";
import { users, teams } from "../mockData";
import { useNotifications } from "../NotificationContext";

const Notifications = () => {
  const { notifications, updateNotification, saveTeams } = useNotifications();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const filteredNotis = notifications.filter((n) =>
    n.toUser.includes(currentUser.id)
  );

  const getTeamById = (id) => teams.find((t) => t.id === id);
  const getUserById = (id) => users.find((u) => u.id === id);

  const handleAction = (noti, isAccept) => {
    updateNotification(noti.id, { isAccept, isRead: true });

    if (isAccept) {
      const team = getTeamById(noti.teamId);
      if (!team.members.includes(noti.fromUser)) {
        team.members.push(noti.fromUser);
        saveTeams(teams);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>

        {filteredNotis.length === 0 ? (
          <p className="text-gray-500">No notifications found.</p>
        ) : (
          <div className="space-y-3">
            {filteredNotis.map((noti) => {
              const sender = getUserById(noti.fromUser);
              const team = getTeamById(noti.teamId);

              return (
                <div
                  key={noti.id}
                  className="bg-white p-4 rounded-lg shadow border-l-4
                  transition
                  hover:shadow-md
                  border-blue-600"
                >
                  <div className="flex justify-between">
                    <p className="font-medium">
                      {noti.title}
                      <span className="text-gray-500 text-xs ml-2">
                        Team: {team?.teamName}
                      </span>
                    </p>

                    <p
                      className={`text-xs font-semibold ${
                        noti.isAccept === true
                          ? "text-green-600"
                          : noti.isAccept === false
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {noti.isAccept === null
                        ? "Pending"
                        : noti.isAccept
                        ? "Accepted"
                        : "Rejected"}
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 mt-1">
                    {noti.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    From: {sender?.name} ({sender?.email})
                  </p>

                  {/* Action Buttons */}
                  {noti.isAccept === null && (
                    <div className="flex gap-2 mt-3">
                      <button
                        className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                        onClick={() => handleAction(noti, true)}
                      >
                        Accept ✅
                      </button>

                      <button
                        className="px-4 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                        onClick={() => handleAction(noti, false)}
                      >
                        Reject ❌
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
