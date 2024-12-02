import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Discover from "./pages/discover/Discover";
import Tasks from "./pages/tasks/Tasks";
import Contributions from "./pages/contributions/Contributions";
import Notifications from "./pages/notifications/Notifications";
import AddProject from "./pages/add-project/AddProject";
import Projects from "./pages/projects/Projects";
import Contributors from "./pages/contributors/Contributors";
import Overview from "./pages/dashboard/Overview";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/toast.css";
import NewTask from "./pages/tasks/NewTask";
import GitHubCallback from "./components/GitHubCallback";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            limit={1}
            closeButton={true}
            closeOnClick={true}
            className="toast-container"
          />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/github/callback" element={<GitHubCallback />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks/new" element={<NewTask />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
