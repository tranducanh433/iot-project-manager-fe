import { useState } from 'react';
import { LayoutDashboard, BookOpen, FolderOpen, Bell, Trophy, User, LogOut, Menu, X, Plus, Trash2 } from 'lucide-react';

export default function CreateTeam() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('team');
  const [showForm, setShowForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [members, setMembers] = useState([
    { email: 'huybdse173401@fpt.edu.vn', status: 'ACCEPTED', role: 'LEADER' },
    { email: 'icontsе161090@fpt.edu.vn', status: 'ACCEPTED', role: null },
    { email: 'anhtdse150629@fpt.edu.vn', status: 'WAITING', role: null }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'fame', label: 'Hall of Fame', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleAddMember = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      const newMember = {
        email: emailInput,
        status: 'WAITING',
        role: null
      };
      setMembers([...members, newMember]);
      setEmailInput('');
      setShowForm(false);
    }
  };

  const handleDeleteMember = (email) => {
    setMembers(members.filter(m => m.email !== email));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-100 text-green-700';
      case 'WAITING':
        return 'bg-red-100 text-red-700';
      case 'LEADER':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
          <div className="relative">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition active:bg-blue-800 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Member
            </button>

            {/* Pop-up Form */}
            {showForm && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg p-4 z-50">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter member email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEmailInput('');
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMember}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Create Team</h1>
              <p className="text-gray-500 mt-2">Create team for your project</p>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {members.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-500">No team members yet. Add your first member!</p>
                </div>
              ) : (
                members.map((member, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{member.email}</p>
                      </div>
                      <div className="flex gap-2">
                        {member.status === 'ACCEPTED' && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('ACCEPTED')}`}>
                            ACCEPTED
                          </span>
                        )}
                        {member.status === 'WAITING' && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('WAITING')}`}>
                            WAITING
                          </span>
                        )}
                        {member.role === 'LEADER' && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('LEADER')}`}>
                            LEADER
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMember(member.email)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when form is open */}
      {showForm && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowForm(false);
            setEmailInput('');
          }}
        ></div>
      )}
    </div>
  );
}