import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { teams, users } from "../mockData";
import { useNotifications } from "../NotificationContext";

const FindTeam = () => {
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const { notifications, addNotification } = useNotifications();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const filteredTeams = teams.filter(
    (team) =>
      team.status.toLowerCase() === "open" &&
      team.teamName.toLowerCase().includes(search.toLowerCase())
  );

  const getMembers = (members) => users.filter((u) => members.includes(u.id));

  const hasApplied = (teamId) =>
    notifications.some(
      (n) =>
        n.fromUser === currentUser.id &&
        n.teamId === teamId &&
        n.isAccept === null
    );

  const handleApply = (team) => {
    if (hasApplied(team.id)) return;

    const leader = users.find((u) => u.id === team.leader);
    const newNotification = {
      id: Date.now(),
      toUser: [leader.id],
      fromUser: currentUser.id,
      teamId: team.id,
      title: "New Join Request",
      content: `User wants to join: ${team.teamName}`,
      isRead: false,
      isAccept: null
    };
    addNotification(newNotification);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Find a Team</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => window.location.href = "/create-team"}>
            {"+ Create Team"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by team name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-3">
          {filteredTeams.map((team) => {
            const members = getMembers(team.members);
            const applied = hasApplied(team.id);

            return (
              <div key={team.id} className="bg-white rounded-lg shadow p-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(openDropdown === team.id ? null : team.id)
                  }
                >
                  <div>
                    <p className="font-medium text-lg">{team.teamName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created on: {team.createDate}
                    </p>
                  </div>

                  <div className="text-sm font-semibold text-blue-600">
                    {members.length}/{team.maxMember}
                  </div>
                </div>

                {openDropdown === team.id && (
                  <div className="mt-3 border-t pt-3">
                    <p className="text-sm text-gray-600 font-medium mb-2">
                      Members:
                    </p>

                    <ul className="text-sm text-gray-700 space-y-1 mb-3">
                      {members.map((m) => (
                        <li
                          key={m.id}
                          className="flex justify-between items-center"
                        >
                          <span>
                            • {m.name}
                            {m.id === team.leader && (
                              <span className="ml-2 text-yellow-600 font-semibold text-xs">
                                ⭐ Leader
                              </span>
                            )}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {m.email}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* ✅ Apply Button */}
                    <button
                      className={`w-full py-2 rounded-md text-sm font-medium transition 
                        ${
                          applied
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      disabled={applied}
                      onClick={() => handleApply(team)}
                    >
                      {applied ? "Applied ✅" : "Apply to Join"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredTeams.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No team found...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTeam;
