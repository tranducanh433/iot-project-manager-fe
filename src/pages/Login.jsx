import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Mail className="text-blue-600 w-6 h-6" />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-1">
          Welcome Back
        </h2>
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
                placeholder="Enter your password"
                className="w-full py-2 outline-none text-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-5 border-t" />

        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-1">Demo Accounts:</p>
          <p>Admin: admin@university.edu</p>
          <p>Instructor: instructor@university.edu</p>
          <p>Student: student@university.edu</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  );
}
