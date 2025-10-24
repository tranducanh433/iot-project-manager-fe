import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { users, teams as initialTeams } from "../mockData";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../NotificationContext";

const CreateTeam = () => {
  const navigate = useNavigate();
  const { addNotification, saveTeams } = useNotifications();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [teams, setTeams] = useState(initialTeams);
  const [teamName, setTeamName] = useState("");
  const [maxMember, setMaxMember] = useState(4);

  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState([]);

  const handleAddEmail = () => {
    if (!emailInput.trim()) return;
    if (invitedEmails.includes(emailInput))
      return alert("This member is already added!");

    // Validate user existence
    const user = users.find((u) => u.email === emailInput);
    if (!user) return alert("Email does not exists in system!");

    if (user.id === currentUser.id)
      return alert("You can’t invite yourself!");

    setInvitedEmails([...invitedEmails, emailInput]);
    setEmailInput("");
  };

  const handleRemoveEmail = (email) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== email));
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) return alert("Team name cannot be empty!");
    if (maxMember < 2) return alert("Max members must be at least 2!");
    if (invitedEmails.length + 1 > maxMember)
      return alert("Number of members exceeds Max Member!");

    const invitedUsers = users.filter((u) =>
      invitedEmails.includes(u.email)
    );

    const newTeam = {
      id: teams.length + 1,
      teamName,
      leader: currentUser.id,
      members: [currentUser.id], // only leader included
      maxMember,
      status: "open",
      createDate: new Date().toLocaleString(),
    };

    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveTeams(updatedTeams);

    // Send invitations
    invitedUsers.forEach((user) => {
      addNotification({
        id: Date.now() + user.id,
        toUser: [user.id],
        fromUser: currentUser.id,
        teamId: newTeam.id,
        title: "Team Invitation",
        content: `You've been invited to join team: ${teamName}`,
        isRead: false,
        isAccept: null,
      });
    });

    alert("Team created! Invitations sent ✅");
    navigate("/find-team");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Create New Team</h2>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          {/* Team Name */}
          <div>
            <label className="text-sm font-medium">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mt-1"
              placeholder="Enter team name..."
            />
          </div>

          {/* Max Member */}
          <div>
            <label className="text-sm font-medium">Max Members</label>
            <input
              type="number"
              min={2}
              max={10}
              value={maxMember}
              onChange={(e) => setMaxMember(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded-md mt-1"
            />
          </div>

          {/* Invite Members by Email */}
          <div>
            <label className="text-sm font-medium">Invite Members by Email</label>

            <div className="flex gap-2 mt-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 border px-3 py-2 rounded-md"
                placeholder="Enter member email..."
              />
              <button
                onClick={handleAddEmail}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                +
              </button>
            </div>

            {/* Display Invited Emails */}
            <div className="mt-2 space-y-1">
              {invitedEmails.map((email) => (
                <div
                  key={email}
                  className="flex justify-between items-center text-sm bg-gray-200 px-3 py-1 rounded-md"
                >
                  {email}
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleCreateTeam}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            ✅ Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
