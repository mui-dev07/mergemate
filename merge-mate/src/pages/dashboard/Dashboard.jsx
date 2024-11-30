import React, { useState } from "react";
import "../../styles/dashboardStyle.css";

const Dashboard = () => {
  // Mock user data - will be replaced with actual auth data
  const [userRole, setUserRole] = useState("contributor"); // or "owner"
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "https://github.com/github.png",
    notifications: 3,
  });

  const contributorNavItems = [
    { icon: "bi-house", label: "Overview", link: "/overview", className: "overview-link" },
    { icon: "bi-compass", label: "Discover Projects", link: "/discover" },
    { icon: "bi-kanban", label: "My Tasks", link: "/tasks" },
    {
      icon: "bi-repository",
      label: "My Contributions",
      link: "/contributions",
    },
  ];

  const ownerNavItems = [
    { icon: "bi-house", label: "Overview", link: "/overview", className: "overview-link" },
    { icon: "bi-plus-circle", label: "Add Project", link: "/add-project" },
    { icon: "bi-kanban", label: "Project Boards", link: "/projects" },
    { icon: "bi-people", label: "Contributors", link: "/contributors" },
  ];

  const navItems =
    userRole === "contributor" ? contributorNavItems : ownerNavItems;

  return (
    <div className="container-fluid bg-light min-vh-100 mt-5">
      <div className="row">
        {/* Left Sidebar - Made collapsible on mobile */}
        <div className="col-lg-3 col-md-4 border-end bg-gradient sidebar-wrapper">
          <div className="p-4 sticky-top">
            {/* Profile Section */}
            <div className="profile-card p-3 mb-4 rounded-3 bg-white shadow-sm hover-effect transition-all">
              <div className="d-flex align-items-center">
                <div className="position-relative">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="rounded-circle border-3 border-primary profile-image"
                    width="50"
                    height="50"
                  />
                  <span className="status-indicator"></span>
                </div>
                <div className="ms-3">
                  <span className="fw-bold text-dark d-block">{user.name}</span>
                  <small className="text-primary text-capitalize fw-medium">{userRole}</small>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="nav flex-column gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="nav-link sidebar-link rounded-pill p-3 d-flex align-items-center"
                >
                  <i className={`bi ${item.icon} nav-icon`}></i>
                  <span className="ms-2">{item.label}</span>
                </a>
              ))}

              {/* Notifications with animation */}
              <a
                href="/notifications"
                className="nav-link sidebar-link rounded-pill p-3 d-flex align-items-center"
              >
                <i className="bi bi-bell nav-icon"></i>
                <span className="ms-2">Notifications</span>
                {user.notifications > 0 && (
                  <span className="notification-badge">
                    {user.notifications}
                  </span>
                )}
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="p-4">
            {/* Header with role switch (for development) */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0 fw-bold">Dashboard</h4>
              <div className="d-flex gap-3">
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>
                    setUserRole(
                      userRole === "contributor" ? "owner" : "contributor"
                    )
                  }
                >
                  Switch to{" "}
                  {userRole === "contributor" ? "Owner" : "Contributor"}
                </button>
                <button className="btn btn-primary shadow-sm hover-effect">
                  {userRole === "contributor" ? "Find Projects" : "Add Project"}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-4 mb-4">
              {[
                { label: "Active Projects", value: "12", icon: "bi-folder" },
                { label: "Pending Tasks", value: "5", icon: "bi-list-check" },
                { label: "Recent Activity", value: "3", icon: "bi-activity" },
              ].map((stat, index) => (
                <div key={index} className="col-md-4">
                  <div className="border rounded-3 p-4 bg-white shadow-sm hover-card">
                    <div className="d-flex align-items-center">
                      <i
                        className={`bi ${stat.icon} fs-1 text-primary me-3`}
                      ></i>
                      <div>
                        <h6 className="mb-0">{stat.label}</h6>
                        <h3 className="mb-0 fw-bold">{stat.value}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h5 className="mb-4">Recent Activity</h5>
              <div className="activity-feed">
                {/* Activity items will go here */}
                <div className="d-flex align-items-center mb-3 p-3 border rounded hover-card">
                  <i className="bi bi-git fs-4 text-success me-3"></i>
                  <div>
                    <p className="mb-0">
                      New pull request in <strong>Project Name</strong>
                    </p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
