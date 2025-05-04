import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import PageLayout from '../../components/PageLayout';
import { useTheme } from '../../context/ThemeContext';

const NewTask = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    techStack: '',
    difficulty: '',
    title: '',
    description: ''
  });

  const techStacks = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'JavaScript',
    // Add more tech stacks as needed
  ];

  const difficulties = [
    'beginner',
    'intermediate',
    'advanced'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    navigate('/tasks');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // New Task header component
  const NewTaskHeader = (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
      <h2 className="mb-0">Create New Task</h2>
    </div>
  );

  return (
    <PageLayout
      title="New Task"
      description="Create a new task in MergeMate"
      header={NewTaskHeader}
      className="new-task-page"
    >
      <div className="new-task-container animate-fade-in">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className={`card rounded-3 shadow-sm border ${isDarkMode ? 'new-task-card-dark' : ''}`}>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Tech Stack</label>
                    <select 
                      className="form-select"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Tech Stack</option>
                      {techStacks.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Difficulty</label>
                    <select 
                      className="form-select"
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Difficulty</option>
                      {difficulties.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter task title"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe the task in detail"
                      required
                    ></textarea>
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="px-4 py-2"
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Create Task
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary"
                      onClick={() => navigate('/tasks')}
                      className="px-4 py-2"
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewTask; 