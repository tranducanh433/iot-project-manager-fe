import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";

const NewProject = () => {
  const [files, setFiles] = useState({
    images: [],
    videos: [],
    code: [],
  });

  const [dragActive, setDragActive] = useState(false);

  const imagesInputRef = useRef(null);
  const videosInputRef = useRef(null);
  const codeInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const allowedTypes = {
    images: ["image/jpeg", "image/png"],
    videos: ["video/mp4", "video/avi"],
    code: ["application/zip", "application/x-rar-compressed"],
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) =>
      allowedTypes[type].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert(`❌ Only ${allowedTypes[type].join(", ")} files are allowed here.`);
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...validFiles],
    }));
  };

  const handleFileChange = (e, type) => {
    const fileList = Array.from(e.target.files);
    const validFiles = fileList.filter((file) =>
      allowedTypes[type].includes(file.type)
    );

    if (validFiles.length === 0) {
      alert(`❌ Only ${allowedTypes[type].join(", ")} files are allowed here.`);
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...validFiles],
    }));
  };

  const handleRemoveFile = (type, index) => {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
          <h1 className="text-xl font-semibold mb-6">New Project</h1>
          <p className="text-sm text-gray-500 mb-8">
            Create and configure your IoT project submission
          </p>

          {/* Project Information */}
          <div className="space-y-4 mb-10">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Title *
              </label>
              <input
                type="text"
                placeholder="Enter your project title"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                placeholder="Describe your IoT project, its purpose, and functionality..."
                className="w-full border rounded-md px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select Class *
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>Choose a class</option>
                <option>IoT Fundamentals</option>
                <option>Sensor Networks</option>
              </select>
            </div>
          </div>

          {/* Upload Zones */}
          <div className="mb-10">
            <h2 className="font-medium mb-3">Project Assets</h2>
            <div className="grid grid-cols-3 gap-4">
              {["images", "videos", "code"].map((type) => (
                <div
                  key={type}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, type)}
                  onClick={() =>
                    (type === "images"
                      ? imagesInputRef
                      : type === "videos"
                      ? videosInputRef
                      : codeInputRef
                    ).current.click()
                  }
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {type === "images"
                      ? "Upload Images"
                      : type === "videos"
                      ? "Upload Videos"
                      : "Upload Code"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {type === "images"
                      ? "JPG, PNG up to 10MB"
                      : type === "videos"
                      ? "MP4, AVI up to 100MB"
                      : "ZIP, RAR up to 50MB"}
                  </p>

                  <input
                    type="file"
                    multiple
                    ref={
                      type === "images"
                        ? imagesInputRef
                        : type === "videos"
                        ? videosInputRef
                        : codeInputRef
                    }
                    className="hidden"
                    onChange={(e) => handleFileChange(e, type)}
                  />

                  {/* Preview */}
                  <div className="mt-3 space-y-2">
                    {files[type].map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md"
                      >
                        <span className="text-xs text-gray-700 truncate w-3/4">
                          {file.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(type, index);
                          }}
                          className="text-red-500 text-sm hover:underline"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IoT Demo Configuration */}
          <div className="mb-8">
            <h2 className="font-medium mb-3">IoT Demo Configuration</h2>
            <div className="flex gap-4 mb-4">
              <button className="flex-1 border rounded-md px-4 py-3 bg-blue-50 border-blue-400 text-blue-700 font-medium">
                MQTT
              </button>
              <button className="flex-1 border rounded-md px-4 py-3 text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition">
                WebSocket
              </button>
            </div>
            <input
              type="text"
              placeholder="https://your-iot-demo.com"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button className="border px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button className="border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
              Save Draft
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Submit Project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewProject;
