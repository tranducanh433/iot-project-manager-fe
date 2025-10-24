import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TeamInfo from "./pages/TeamInfo.jsx";
import CreateTeam from "./pages/CreateTeam.jsx";
import Notifications from "./pages/Notifications.jsx";
import NewProject from "./pages/NewProject.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Profile from "./pages/Profile.jsx";
import MyClasses from "./pages/MyClasses.jsx";
import TeamFinderPage from "./pages/TeamFinderPage";
import { NotificationProvider } from "./NotificationContext";



export default function App() {
  return (
    <Router>
      <NotificationProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/team-info" element={<TeamInfo />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/instructor/classes" element={<MyClasses />} />
        <Route path="/teams" element={<TeamFinderPage />} />
      </Routes>
      </NotificationProvider>
    </Router>
  );
}
