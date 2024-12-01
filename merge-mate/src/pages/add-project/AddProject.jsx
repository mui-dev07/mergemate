import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import "../../styles/AddProject.css";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    techStack: '',
    githubUrl: '',
    projectImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const [previewImage, setPreviewImage] = useState(null);

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Add New Project | MergeMate</title>
      </Helmet>
      <div className="add-project-container">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card add-project-card">
                <div className="card-body">
                  <h2 className="text-center mb-4">Add New Project</h2>
                  <form onSubmit={handleSubmit} className="add-project-form">
                    <div className="mb-4">
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control custom-input"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Tech Stack</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        name="techStack"
                        placeholder="e.g., React, Node.js, MongoDB"
                        value={formData.techStack}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-control custom-input"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Project Image</label>
                      <input
                        type="file"
                        className="form-control custom-input"
                        name="projectImage"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn w-100">
                      Add Project
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject; 