import React, { useState } from "react";
import "../../styles/Contributors.css";

const Contributors = () => {
  // Mock data - replace with actual API data later
  const [contributors] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "https://github.com/github.png",
      role: "Frontend Developer",
      contributions: 156,
      status: "active",
      skills: ["React", "TypeScript", "CSS"],
      lastActive: "2 hours ago"
    },
    // Add more mock contributors as needed
  ]);

  return (
    <div className="container-fluid bg-light min-vh-100 mt-5">
      <div className="contributors-container p-4">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Project Contributors</h4>
            <p className="text-muted mb-0">Manage and view project contributors</p>
          </div>
          <button className="btn btn-primary shadow-sm hover-effect">
            <i className="bi bi-plus-lg me-2"></i>
            Invite Contributor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {[
            { label: "Total Contributors", value: "24", icon: "bi-people-fill" },
            { label: "Active This Week", value: "18", icon: "bi-person-check-fill" },
            { label: "Pending Invites", value: "3", icon: "bi-envelope" },
          ].map((stat, index) => (
            <div key={index} className="col-md-4">
              <div className="stat-card border rounded-3 p-4 bg-white shadow-sm">
                <div className="d-flex align-items-center">
                  <div className="stat-icon-wrapper me-3">
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                  <div>
                    <h6 className="mb-0 text-muted">{stat.label}</h6>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contributors List */}
        <div className="bg-white rounded-3 shadow-sm p-4">
          <div className="contributors-grid">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="contributor-card">
                <div className="contributor-header">
                  <div className="position-relative">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="contributor-avatar"
                    />
                    <span className={`status-dot status-${contributor.status}`}></span>
                  </div>
                  <div className="contributor-info">
                    <h6 className="mb-1 fw-bold">{contributor.name}</h6>
                    <span className="text-muted small">{contributor.role}</span>
                  </div>
                </div>
                
                <div className="contributor-stats">
                  <div className="stat">
                    <i className="bi bi-git me-2"></i>
                    {contributor.contributions} contributions
                  </div>
                  <div className="stat">
                    <i className="bi bi-clock-history me-2"></i>
                    {contributor.lastActive}
                  </div>
                </div>

                <div className="skills-container">
                  {contributor.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="contributor-actions">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-chat-dots me-2"></i>
                    Message
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributors;