import React, { useState } from "react";
import "../../styles/Contributors.css";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";

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
    {
      id: 2,
      name: "James Smith",
      avatar: "https://github.com/github-user1.png",
      role: "Backend Developer",
      contributions: 204,
      status: "active",
      skills: ["Node.js", "Express", "MongoDB"],
      lastActive: "30 minutes ago",
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar: "https://github.com/github-user2.png",
      role: "UI/UX Designer",
      contributions: 98,
      status: "inactive",
      skills: ["Figma", "Sketch", "Adobe XD"],
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "https://github.com/github-user3.png",
      role: "Full-Stack Developer",
      contributions: 321,
      status: "active",
      skills: ["Angular", "Java", "SQL"],
      lastActive: "5 minutes ago",
    },
    
  ]);

  // Header component
  const ContributorsHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <div>
        <h2 className="mb-1">Project Contributors</h2>
        <p className="text-muted mb-0">Manage and view project contributors</p>
      </div>
      
      <Button variant="primary">
        <i className="bi bi-plus-lg me-2"></i>
        Invite Contributor
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Contributors"
      description="Manage and view project contributors"
      header={ContributorsHeader}
    >
      <div className="contributors-container">
        {/* Stats Cards */}
        <div className="row g-3 g-md-4 mb-4 text-center justify-content-center">
          {[
            { label: "Total Contributors", value: "24", icon: "bi-people-fill" },
            { label: "Active This Week", value: "18", icon: "bi-person-check-fill" },
            { label: "Pending Invites", value: "3", icon: "bi-envelope" },
          ].map((stat, index) => (
            <div key={index} className="col-md-4">
              <div className="stat-card border rounded-3 p-3 p-md-4 shadow-sm text-center">
                <div className="d-flex align-items-center">
                  <div className="stat-icon-wrapper me-3 d-flex align-items-center pt-2">
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
        <div className="content-card rounded-3 shadow-sm p-3 p-md-4">
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
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-three-dots"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contributors;