import { useState } from "react";
import "../../styles/Projects.css";
import PageLayout from "../../components/PageLayout";
import { useTheme } from "../../context/ThemeContext";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([
    // Dummy data - replace with your actual data

    {
      id: 1,
      title: "Project Alpha",
      description: "A revolutionary web application",
      status: "In Progress",
      tech: ["React", "Node.js", "MongoDB"],
      progress: 75,
    },
    {
      id: 2,
      title: "Project Beta",
      description: "An AI-driven chatbot for customer support",
      status: "Completed",
      tech: ["Python", "TensorFlow", "Flask"],
      progress: 100,
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "A real-time collaboration tool for developers",
      status: "In Progress",
      tech: ["Vue.js", "Django", "PostgreSQL"],
      progress: 60,
    },
    {
      id: 4,
      title: "Project Delta",
      description: "A mobile fitness tracking app",
      status: "In Progress",
      tech: ["Flutter", "Firebase", "Node.js"],
      progress: 40,
    },
    {
      id: 5,
      title: "Project Epsilon",
      description: "A blockchain-based voting platform",
      status: "Planned",
      tech: ["Ethereum", "Solidity", "React"],
      progress: 0,
    },
    {
      id: 6,
      title: "Project Zeta",
      description: "An e-commerce platform with AR features",
      status: "Completed",
      tech: ["Angular", "Spring Boot", "MySQL"],
      progress: 100,
    },
    {
      id: 7,
      title: "Project Eta",
      description: "A machine learning model for predictive analytics",
      status: "In Progress",
      tech: ["Python", "Scikit-learn", "Pandas"],
      progress: 85,
    },
    {
      id: 8,
      title: "Project Theta",
      description: "A lightweight note-taking app",
      status: "In Progress",
      tech: ["React Native", "Redux", "SQLite"],
      progress: 50,
    },
    {
      id: 9,
      title: "Project Iota",
      description: "A cloud-based task management system",
      status: "Planned",
      tech: ["AWS", "Node.js", "React"],
      progress: 0,
    },
    {
      id: 10,
      title: "Project Kappa",
      description: "A SaaS tool for expense tracking",
      status: "In Progress",
      tech: ["Laravel", "Vue.js", "PostgreSQL"],
      progress: 70,
    },
    {
      id: 11,
      title: "Project Lambda",
      description: "A social media platform for artists",
      status: "Completed",
      tech: ["Ruby on Rails", "React", "PostgreSQL"],
      progress: 100,
    },
    {
      id: 12,
      title: "Project Mu",
      description: "A gamified learning platform for kids",
      status: "In Progress",
      tech: ["Unity", "C#", "Firebase"],
      progress: 45,
    },

    // Add more projects as needed
  ]);

  // Projects header component
  const ProjectsHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
      <h2 className="mb-0">My Projects</h2>
      <button className="btn btn-primary mt-2 mt-md-0">
        <i className="bi bi-plus-circle me-2"></i>
        Add New Project
      </button>
    </div>
  );

  return (
    <PageLayout 
      title="Projects" 
      description="Manage your MergeMate projects"
      header={ProjectsHeader}
      className="projects-page"
    >
      <div className="projects-container animate-fade-in">
        <div className="row g-4">
          {projects.map((project) => (
            <div key={project.id} className="col-12 col-md-6 col-lg-4">
              <div className={`project-card h-100 animate-slide-up ${isDarkMode ? 'project-card-dark' : ''}`}>
                <div className={`project-status-badge status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>{project.status}</div>
                <div className="card-body p-4">
                  <h5 className="project-title">{project.title}</h5>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="progress-wrapper mt-4">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="progress-label">Progress</div>
                      <div className="progress-value">{project.progress}%</div>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar bg-${project.progress === 100 ? 'success' : project.progress > 50 ? 'primary' : 'warning'}`}
                        role="progressbar"
                        style={{ width: `${project.progress}%` }}
                        aria-valuenow={project.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye me-1"></i> View
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-gear me-1"></i> Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
