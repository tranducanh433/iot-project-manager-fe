import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { users, teams, notifications, projects, assets, classes, scores } from "../mockData";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if(!localStorage.getItem("userLst")){
    localStorage.setItem("userLst", JSON.stringify(users));
  }
  if(!localStorage.getItem("teams")){
    localStorage.setItem("teams", JSON.stringify(teams));
  }
  if(!localStorage.getItem("notifications")){
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }
  if(!localStorage.getItem("projects")){
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  if(!localStorage.getItem("assets")){
    localStorage.setItem("assets", JSON.stringify(assets));
  }
  if(!localStorage.getItem("classes")){
    localStorage.setItem("classes", JSON.stringify(classes));
  }
  if(!localStorage.getItem("scores")){
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.email === email && u.pass === password
      );

      if (!foundUser) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("isLoggedIn", "true");

      setLoading(false);

      if (foundUser.role === 0)
      {
        if(teams.some(team => team.members.includes(foundUser.id)))
          navigate("/dashboard");
        else
          navigate("/teams");
      } 
      else if (foundUser.role === 1) navigate("/instructor/classes");
      else navigate("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Mail className="text-blue-600 w-6 h-6" />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to your IoT Projects account
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <div className="flex items-center border rounded-md mt-1 px-3">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-2 outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-md mt-1 px-3">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-2 outline-none text-gray-700"
                required
              />
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition flex justify-center disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
