import React from "react";
import "../../styles/dashboardStyle.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  // Dashboard header component
  const DashboardHeader = (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-2">
      <h4 className="mb-0 fw-bold">Dashboard</h4>
      <div className="d-flex gap-2 flex-wrap">
        <Button
          variant="outline-primary"
          as={Link}
          to="/discover"
          className="btn-sm"
        >
          <i className="bi bi-compass me-1"></i>
          Find Projects
        </Button>
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Dashboard"
      fluid={true}
      header={DashboardHeader}
      className="dashboard-page"
    >
      <ResponsiveContainer className="dashboard-container py-4">
        <div className="row mb-5">
          <div className="col-12">
            <div className="welcome-card bg-gradient-primary p-4 p-md-5 rounded-4 text-white shadow position-relative overflow-hidden">
              <div className="welcome-content">
                <h2 className="fw-bold mb-3">Welcome to MergeMate!</h2>
                <p className="lead mb-4">
                  Start collaborating on open source projects and track your
                  contributions in one place.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button variant="light" as={Link} to="/discover">
                    <i className="bi bi-search me-2"></i>
                    Find Projects
                  </Button>
                  <Button variant="outline-light" as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    Complete Your Profile
                  </Button>
                </div>
              </div>
              <div className="welcome-decoration">
                <i className="bi bi-code-slash"></i>
                <i className="bi bi-git"></i>
                <i className="bi bi-braces"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="row g-3 g-md-4 mb-4">
          {[
            {
              label: "Active Projects",
              value: "12",
              icon: "bi-folder",
              color: "primary",
            },
            {
              label: "Pending Tasks",
              value: "5",
              icon: "bi-list-check",
              color: "warning",
            },
            {
              label: "Recent Activity",
              value: "3",
              icon: "bi-activity",
              color: "success",
            },
          ].map((stat, index) => (
            <div key={index} className="col-sm-6 col-md-4">
              <div className="border rounded-3 p-3 p-md-4 shadow-sm hover-card">
                <div className="d-flex align-items-center">
                  <div className={`stat-icon-bg bg-${stat.color}-soft me-3`}>
                    <i className={`bi ${stat.icon} text-${stat.color}`}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-muted">{stat.label}</h6>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Recent Activity Feed */}
          <div className="col-md-7">
            <div className="content-card rounded-3 shadow-sm p-3 p-md-4">
              <h5 className="section-title mb-4">Recent Activity</h5>
              <div className="activity-feed">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="activity-item d-flex mb-3 p-3 border rounded-3 hover-card"
                  >
                    <i className="bi bi-git fs-4 text-success me-3"></i>
                    <div>
                      <p className="mb-1">
                        New pull request in <strong>Project Name</strong>
                      </p>
                      <small className="text-muted">
                        {index + 1} hour{index !== 0 ? "s" : ""} ago
                      </small>
                    </div>
                    <button className="ms-auto btn btn-sm btn-icon">
                      <i className="bi bi-arrow-right-circle"></i>
                    </button>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <Button variant="outline-primary" size="sm">
                    View All Activity
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-5">
            <div className="content-card rounded-3 shadow-sm p-3 p-md-4">
              <h5 className="section-title mb-4">Quick Links</h5>
              <div className="d-grid gap-3">
                <Link
                  to="/tasks"
                  className="quick-link-card d-flex align-items-center p-3 rounded-3 border hover-card text-decoration-none"
                >
                  <i className="bi bi-kanban fs-4 me-3 text-primary"></i>
                  <div>
                    <h6 className="mb-1">My Tasks</h6>
                    <p className="text-muted mb-0">
                      View and manage your assigned tasks
                    </p>
                  </div>
                </Link>
                <Link
                  to="/projects"
                  className="quick-link-card d-flex align-items-center p-3 rounded-3 border hover-card text-decoration-none"
                >
                  <i className="bi bi-folder fs-4 me-3 text-warning"></i>
                  <div>
                    <h6 className="mb-1">My Projects</h6>
                    <p className="text-muted mb-0">
                      View all your active projects
                    </p>
                  </div>
                </Link>
                <Link
                  to="/discover"
                  className="quick-link-card d-flex align-items-center p-3 rounded-3 border hover-card text-decoration-none"
                >
                  <i className="bi bi-compass fs-4 me-3 text-info"></i>
                  <div>
                    <h6 className="mb-1">Discover</h6>
                    <p className="text-muted mb-0">
                      Find new open source projects to join
                    </p>
                  </div>
                </Link>
                <Link
                  to="/contributions"
                  className="quick-link-card d-flex align-items-center p-3 rounded-3 border hover-card text-decoration-none"
                >
                  <i className="bi bi-git fs-4 me-3 text-success"></i>
                  <div>
                    <h6 className="mb-1">My Contributions</h6>
                    <p className="text-muted mb-0">
                      Track your open source contributions
                    </p>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="quick-link-card d-flex align-items-center p-3 rounded-3 border hover-card text-decoration-none"
                >
                  <i className="bi bi-person-badge fs-4 me-3 text-info"></i>
                  <div>
                    <h6 className="mb-1">My Profile</h6>
                    <p className="text-muted mb-0">
                      Update your profile and settings
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </PageLayout>
  );
};

export default Dashboard;
