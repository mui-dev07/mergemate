import React, { useState } from "react";
import "../../styles/contributionsStyle.css";
import Button from "../../components/Button";
import PageLayout from "../../components/PageLayout";

const Contributions = () => {
  const [contributions] = useState([
    {
      projectName: "Project Alpha",
      type: "Pull Request",
      status: "merged",
      date: "2024-03-15",
      description: "Implemented new authentication flow",
      commits: 5,
      comments: 3,
      reviewers: [
        "https://github.com/github.png",
        "https://github.com/github.png",
      ],
    },
    {
      projectName: "Project Beta",
      type: "Issue",
      status: "open",
      date: "2024-03-14",
      description: "Bug fix in payment processing",
      commits: 2,
      comments: 8,
      reviewers: ["https://github.com/github.png"],
    },
  ]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "merged":
        return "bg-success";
      case "open":
        return "bg-primary";
      case "closed":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Header component
  const ContributionsHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <h2 className="mb-0">My Contributions</h2>
      <Button variant="primary">
        <i className="bi bi-plus-lg me-2"></i>New Contribution
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Contributions"
      description="Track your contributions across projects"
      header={ContributionsHeader}
    >
      <div className="contributions-container">
        {/* Stats Cards */}
        <div className="row g-3 g-md-4 mb-4">
          {[
            { label: "Total Contributions", value: "24", icon: "bi-git" },
            {
              label: "Open Pull Requests",
              value: "3",
              icon: "bi-code-square",
            },
            {
              label: "Merged This Month",
              value: "8",
              icon: "bi-check2-circle",
            },
          ].map((stat, index) => (
            <div key={index} className="col-md-4">
              <div className="stat-card border rounded-3 p-3 p-md-4 shadow-sm">
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

        {/* Contributions List */}
        <div className="content-card rounded-3 shadow-sm p-3 p-md-4">
          <h5 className="section-title mb-4">Recent Contributions</h5>
          <div className="contributions-list">
            {contributions.map((contribution, index) => (
              <div
                key={index}
                className="contribution-card p-3 p-md-4 mb-3 border rounded-3"
              >
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                  <div>
                    <h5 className="contribution-title mb-2">{contribution.projectName}</h5>
                    <p className="mb-2 text-muted">
                      {contribution.description}
                    </p>
                    <div className="d-flex flex-wrap align-items-center gap-2 gap-md-3">
                      <span
                        className={`badge ${getStatusBadgeClass(
                          contribution.status
                        )}`}
                      >
                        {contribution.status}
                      </span>
                      <span className="text-muted">
                        <i className="bi bi-git me-1"></i>
                        {contribution.commits} commits
                      </span>
                      <span className="text-muted">
                        <i className="bi bi-chat-dots me-1"></i>
                        {contribution.comments} comments
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-start align-items-md-end">
                    <div className="reviewers-stack mb-2">
                      {contribution.reviewers.map((reviewer, idx) => (
                        <img
                          key={idx}
                          src={reviewer}
                          alt="Reviewer"
                          className="reviewer-avatar"
                        />
                      ))}
                    </div>
                    <small className="text-muted">
                      {contribution.date}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contributions;
