import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import ThemeToggleButton from "./ThemeToggleButton";
import { useState, useEffect, useRef } from "react";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") || "contributor"
  );
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    // Get userRole from localStorage whenever it changes
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
    closeNavbar();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close navbar when a link is clicked (mobile view)
  const closeNavbar = () => {
    if (window.innerWidth < 992) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };

  // Navigation items based on user role
  const getNavItems = () => {
    if (userRole === "contributor") {
      return [
        { icon: "bi-house", label: "Dashboard", path: "/dashboard" },
        { icon: "bi-compass", label: "Discover", path: "/discover" },
        { icon: "bi-kanban", label: "Tasks", path: "/tasks" },
        { icon: "bi-git", label: "Contributions", path: "/contributions" },
      ];
    } else {
      return [
        { icon: "bi-house", label: "Dashboard", path: "/dashboard" },
        { icon: "bi-plus-circle", label: "Add Project", path: "/add-project" },
        { icon: "bi-kanban", label: "Projects", path: "/projects" },
        { icon: "bi-people", label: "Contributors", path: "/contributors" },
      ];
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-git me-2"></i>
          <span className="h4 mb-0">MergeMate</span>
        </Link>

        <div className="d-flex align-items-center order-lg-last ms-auto me-2">
          <ThemeToggleButton className="me-2" />
          
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Link to="/notifications" className="nav-icon-link position-relative me-2" onClick={closeNavbar}>
                <i className="bi bi-bell"></i>
                <span className="notification-dot"></span>
              </Link>

              {/* Profile dropdown */}
              <div className="dropdown me-2 d-none d-lg-block">
                <button className="btn nav-profile-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/github.png" alt="Profile" className="avatar-sm" />
                  <i className="bi bi-chevron-down ms-1 small"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeIn">
                  <li><span className="dropdown-item-text text-capitalize fw-medium">{userRole}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/profile" onClick={closeNavbar}>Your profile</Link></li>
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        const newRole = userRole === "contributor" ? "owner" : "contributor";
                        localStorage.setItem("userRole", newRole);
                        setUserRole(newRole);
                        closeNavbar();
                      }}
                    >
                      Switch to {userRole === "contributor" ? "Owner" : "Contributor"}
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
              
              <button 
                className="btn btn-outline-primary btn-sm d-none d-lg-block ms-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm" onClick={closeNavbar}>
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Sign in
            </Link>
          )}
        </div>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && getNavItems().map((item, index) => (
              <li className="nav-item" key={index}>
                <Link 
                  className={`nav-link px-3 github-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  to={item.path}
                  onClick={closeNavbar}
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.label}
                </Link>
              </li>
            ))}
            
            {isAuthenticated && (
              <li className="nav-item d-lg-none">
                <Link 
                  className="nav-link px-3 github-nav-link"
                  to="/profile"
                  onClick={closeNavbar}
                >
                  <i className="bi bi-person me-1"></i>
                  Profile
                </Link>
              </li>
            )}
            
            {isAuthenticated && (
              <li className="nav-item d-lg-none">
                <button
                  className="nav-link px-3 w-100 text-start border-0 bg-transparent github-nav-link"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;