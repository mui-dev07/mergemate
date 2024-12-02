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

  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        projectImage: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Project | MergeMate</title>
      </Helmet>
      <div className="add-project-container">
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-12">
              <div className="card project-card shadow-lg border-0">
                <div className="card-body p-0">
                  <div className="row g-0">
                    {/* Image Preview Section */}
                    <div className="col-md-5 bg-dark img-bg position-relative"
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}>
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Project Preview" 
                          className="w-100 h-100 object-fit-cover project-preview-horizontal"
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white opacity-75">
                          <i className="bi bi-cloud-upload fs-1 mb-2"></i>
                          <span>Drag and drop an image here</span>
                          <span className="mt-2">- or -</span>
                          <span>Click to browse</span>
                        </div>
                      )}
                      <div className="image-upload-overlay">
                        <input
                          type="file"
                          id="projectImageUpload"
                          className="d-none"
                          name="projectImage"
                          onChange={handleChange}
                          accept="image/*"
                        />
                        <label 
                          htmlFor="projectImageUpload" 
                          className="btn btn-light position-absolute bottom-0 start-0 m-3"
                        >
                          Upload Image
                        </label>
                      </div>
                    </div>

                    {/* Form Section */}
                    <div className="col-md-7">
                      <form onSubmit={handleSubmit} className="p-5 add-project-form">
                        <h2 className="text-center mb-5 project-title">Add New Project</h2>
                        
                        {/* Project Name */}
                        <div className="form-group mb-4">
                          <label className="form-label">Project Name</label>
                          <input
                            type="text"
                            className="form-control sleek-input"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            required
                          />
                        </div>

                        {/* Description */}
                        <div className="form-group mb-4">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control sleek-input"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your project"
                            required
                          />
                        </div>

                        {/* Tech Stack */}
                        <div className="form-group mb-4">
                          <label className="form-label">Tech Stack</label>
                          <input
                            type="text"
                            className="form-control sleek-input"
                            name="techStack"
                            placeholder="e.g., React, Node.js, MongoDB"
                            value={formData.techStack}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* GitHub URL */}
                        <div className="form-group mb-4">
                          <label className="form-label">GitHub URL</label>
                          <input
                            type="url"
                            className="form-control sleek-input"
                            name="githubUrl"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/username/project"
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                          <button 
                            type="submit" 
                            className="btn btn-dark btn-lg submit-btn"
                          >
                            Add Project
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
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