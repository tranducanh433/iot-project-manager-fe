import React, { useState } from "react";
import { ArrowLeft, Upload, Download, File, Image, Video, Code } from "lucide-react";
import Sidebar from "../components/Sidebar";

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("assets");

  const project = {
    title: "Smart Home IoT System",
    course: "IoT Fundamentals",
    description:
      "A comprehensive IoT system for home automation including temperature, humidity, and motion sensors with real-time monitoring capabilities.",
    evaluated: true,
    assets: [
      {
        name: "system_diagram.jpg",
        type: "IMAGE",
        size: "2.38 MB",
      },
      {
        name: "demo_video.mp4",
        type: "VIDEO",
        size: "14.31 MB",
      },
      {
        name: "source_code.zip",
        type: "CODE",
        size: "1.14 MB",
      },
    ],
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case "IMAGE":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "VIDEO":
        return <Video className="w-5 h-5 text-purple-500" />;
      case "CODE":
        return <Code className="w-5 h-5 text-orange-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
    <div className="flex flex-col p-6 md:p-10 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 text-gray-500 mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Projects</span>
      </div>

      {/* Project Title */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <p className="text-gray-500">{project.course}</p>
        </div>
        {project.evaluated && (
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">
            Evaluated
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 mt-3">
        {["assets", "live demo", "feedback"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "assets" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800 text-lg">
              Project Assets
            </h2>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              Upload More
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">{project.description}</p>

          {/* File Cards */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            {project.assets.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {renderFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.type}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{file.size}</span>
                  <button className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "live demo" && (
        <div className="text-gray-500 text-sm italic">Live demo content here...</div>
      )}
      {activeTab === "feedback" && (
        <div className="text-gray-500 text-sm italic">Feedback content here...</div>
      )}
    </div>
    
    </div>
  );
};

export default ProjectDetail;
