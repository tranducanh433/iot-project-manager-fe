import {
  LayoutDashboard,
  BookOpen,
  Folder,
  Bell,
  Award,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl">IoT Projects</div>
        <div className="px-6 text-sm text-gray-500 mb-6">Alex Chen</div>

        <nav className="space-y-1">
          <SidebarItem icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarItem icon={<BookOpen />} text="My Classes" />
          <SidebarItem icon={<Folder />} text="My Projects" active />
          <SidebarItem icon={<Bell />} text="Notifications" />
          <SidebarItem icon={<Award />} text="Hall of Fame" />
          <SidebarItem icon={<User />} text="Profile" />
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center px-6 py-4 text-gray-600 hover:text-red-600 transition"
      >
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>
    </div>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`flex items-center w-full px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition ${
        active ? "bg-blue-50 text-blue-600 font-medium" : ""
      }`}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      {text}
    </button>
  );
}
