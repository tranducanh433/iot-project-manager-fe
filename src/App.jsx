import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateTeam from "./pages/CreateTeam.jsx";
import Notifications from "./pages/Notifications.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}
