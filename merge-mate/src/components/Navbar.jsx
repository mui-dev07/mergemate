import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-git me-2"></i>
          <span className="h4 mb-0">MergeMate</span>
        </Link>
        {isAuthenticated && (
          <>
            <button
              className="navbar-toggler border-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/dashboard">
                    <i className="bi bi-columns-gap me-1"></i>
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;