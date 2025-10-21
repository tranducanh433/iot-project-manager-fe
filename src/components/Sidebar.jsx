import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Folder,
  Bell,
  Award,
  User,
  LogOut,
  Users,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  // 👇 Ở đây tạm lấy role từ localStorage (hoặc API)
  const [role, setRole] = useState("student");

  useEffect(() => {
    // Ví dụ: role được lưu sau khi login
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  // 🧱 Menu cho từng role
  const baseMenu = [
    // { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "Hall of Fame", icon: <Award size={18} />, path: "/hall-of-fame" },
    { name: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  const roleMenus = {
    admin: [
      { name: "User Management", icon: <Users size={18} />, path: "/user-management" },
      { name: "System Settings", icon: <Settings size={18} />, path: "/settings" },
    ],
    instructor: [
      { name: "My Classes", icon: <BookOpen size={18} />, path: "/classes" },
      { name: "My Projects", icon: <Folder size={18} />, path: "/dashboard" },
    ],
    student: [
      { name: "My Projects", icon: <Folder size={18} />, path: "/dashboard" },
    ],
  };

  // ✅ Gộp menu chung + menu riêng
  const finalMenu = [
    //...baseMenu.slice(0, 1),
    ...(roleMenus[role] || []),
    ...baseMenu.slice(0, 4),
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-5 border-b">
        <h1 className="text-lg font-semibold text-gray-800">IoT Projects</h1>
        <p className="text-sm text-gray-500 mt-1">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {finalMenu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 pl-[4px]"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t px-3 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-600 hover:text-red-600 text-sm w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
