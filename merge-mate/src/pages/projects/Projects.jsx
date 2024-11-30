import { useState, useEffect } from 'react';
import "../../styles/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([
    // Dummy data - replace with your actual data
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A revolutionary web application',
      status: 'In Progress',
      tech: ['React', 'Node.js', 'MongoDB'],
      progress: 75
    },
    // Add more projects as needed
  ]);

  return (
    <div className="container-fluid projects-container py-5">
      <h1 className="text-center mb-5 projects-title">My Projects</h1>
      <div className="row g-4">
        {projects.map(project => (
          <div key={project.id} className="col-12 col-md-6 col-lg-4">
            <div className="project-card h-100">
              <div className="project-status-badge">{project.status}</div>
              <div className="card-body">
                <h5 className="project-title">{project.title}</h5>
                <p className="project-description">
                  {project.description}
                </p>
                <div className="tech-stack">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="progress-wrapper">
                  <div className="progress-label">Progress</div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${project.progress}%` }}
                      aria-valuenow={project.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {project.progress}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 