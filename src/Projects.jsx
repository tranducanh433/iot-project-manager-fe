import { useState } from 'react';
import { LayoutDashboard, BookOpen, FolderOpen, Bell, Trophy, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('projects');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'fame', label: 'Hall of Fame', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const projects = [
    {
      title: 'Smart Home IoT System',
      category: 'IoT Fundamentals',
      date: 'Submitted 12/10/2025',
      status: 'Evaluated',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Weather Monitoring Station',
      category: 'Sensor Networks',
      date: 'Submitted 1/18/2025',
      status: 'Submitted',
      statusColor: 'bg-green-100 text-green-700'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-56' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-full z-40 md:relative`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="font-bold text-gray-800 text-sm">IoT Projects</p>
                <p className="text-xs text-gray-500">Alex Chen</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition text-sm">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex-1"></div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition active:bg-blue-800">
            Create Team
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">My Projects</h1>
              <p className="text-gray-500 mt-2">Manage your IoT project submissions</p>
            </div>

            {/* Projects Grid */}
            <div className="space-y-3">
              {projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{project.category}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{project.date}</p>
                    </div>

                    {/* Right Content */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${project.statusColor}`}>
                        {project.status}
                      </span>
                      <div className="flex gap-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State for More Projects */}
            <div className="mt-8 text-center text-gray-500">
              <p>No more projects to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}