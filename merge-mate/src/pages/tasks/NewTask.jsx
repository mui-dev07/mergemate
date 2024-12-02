import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Helmet } from 'react-helmet-async';

const NewTask = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <Helmet>
        <title>New Task | MergeMate</title>
      </Helmet>
      <div className="container py-4 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center mb-4 fw-bold text-primary">Create New Task</h4>
                <form onSubmit={handleSubmit} className="needs-validation">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Tech Stack</label>
                    <select 
                      className="form-select shadow-none border-secondary-subtle"
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

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Difficulty</label>
                    <select 
                      className="form-select shadow-none border-secondary-subtle"
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

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control shadow-none border-secondary-subtle"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control shadow-none border-secondary-subtle"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="d-flex gap-2 justify-content-center">
                    <Button 
                      type="submit" 
                      variant="navbar"
                      className="px-4 py-2"
                    >
                      Create Task
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-dark"
                      onClick={() => navigate('/tasks')}
                      className="px-4 py-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .form-control:focus,
          .form-select:focus {
            border-color: #86b7fe;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          }
          
          .card {
            transition: all 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-2px);
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default NewTask; 