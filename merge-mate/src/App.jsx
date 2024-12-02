import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { HelmetProvider } from 'react-helmet-async';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/toast.css';
import NewTask from './pages/tasks/NewTask';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/overview"
              element={isAuthenticated ? <Overview /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/discover"
              element={isAuthenticated ? <Discover /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks"
              element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />}
            />
            <Route
              path="/contributions"
              element={isAuthenticated ? <Contributions /> : <Navigate to="/login" />}
            />
            
            <Route
              path="/notifications"
              element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />}
            />

            <Route
              path="/add-project"
              element={isAuthenticated ? <AddProject /> : <Navigate to="/login" />}
            />
            
            <Route
              path="/projects"
              element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
            />

            <Route
              path="/contributors"
              element={isAuthenticated ? <Contributors /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/tasks/new"
              element={isAuthenticated ? <NewTask /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
