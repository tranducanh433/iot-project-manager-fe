import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { users } from "../mockData";
import { Crown } from "lucide-react";

export default function TeamInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const allTeams = getTeams();
    const foundTeam = allTeams.find((t) => t.id === Number(id));
    setTeam(foundTeam);
  }, [id]);

  if (!team) return <p className="text-center mt-10">Loading...</p>;

  const leader = users.find((u) => u.id === team.leader);

  const acceptedMembers = team.member
    .filter((m) => m.isAccept === true)
    .map((m) => users.find((u) => u.id === m.userId));

  const pendingMembers = team.member
    .filter((m) => m.isAccept === null)
    .map((m) => users.find((u) => u.id === m.userId));

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{team.teamName}</h1>

      {/* Leader */}
      <div className="p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          Leader <Crown className="w-5 h-5 text-yellow-500" />
        </h2>
        <p className="font-medium">{leader?.name}</p>
      </div>

      {/* Accepted Members */}
      <div className="p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-2">Confirmed Members ✅</h2>
        {acceptedMembers.length > 0 ? (
          <ul className="list-disc pl-6">
            {acceptedMembers.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No member confirmed yet</p>
        )}
      </div>

      {/* Pending */}
      <div className="p-4 border rounded-md bg-yellow-50">
        <h2 className="text-lg font-semibold mb-2">Waiting for response ⏳</h2>
        {pendingMembers.length > 0 ? (
          <ul className="list-disc pl-6">
            {pendingMembers.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No pending members</p>
        )}
      </div>

      {/* Create Project */}
      <button
        onClick={() => navigate(`/create-project/${team.id}`)}
        className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
      >
        Create Project
      </button>
    </div>
  );
}
