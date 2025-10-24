import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { User, Mail, Phone } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, [navigate]);

  const handleSave = () => {
    alert("Changes saved!");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-600 text-sm hover:underline"
            >
              {/* ← Back to Dashboard */}
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-2">Profile</h1>

            {/* TABS
            <div className="flex gap-8 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "security"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Security
              </button>
            </div> */}

            {activeTab === "profile" ? (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* AVATAR */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{currentUser.name}</h2>
                    <p className="text-gray-500 text-sm">{currentUser.role}</p>
                  </div>
                </div>

                {/* FORM */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-800">{currentUser.name}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-800">{currentUser.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-800">{currentUser.phone}</span>
                    </div>
                  </div>

                  {/* <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md mt-2 flex items-center gap-2"
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-gray-500 text-sm">
                <p>Security settings will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
