import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/Button';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import '../../styles/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
    bio: '',
    email: '',
    location: '',
    company: '',
    experienceLevel: 'intermediate',
    expertise: [],
    techStack: [],
    githubUsername: '',
    repositories: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubProfile();
  }, []);

  const fetchGitHubProfile = async () => {
    try {
      // TODO: Replace with your GitHub API integration
      const mockData = {
        name: 'John Doe',
        avatar: 'https://github.com/github.png',
        bio: 'Full-stack developer',
        email: 'john@example.com',
        location: 'San Francisco',
        company: 'Tech Corp',
        repositories: [
          { name: 'project-1', stars: 10, description: 'Cool project' },
          { name: 'project-2', stars: 5, description: 'Another project' }
        ]
      };

      setProfile(prev => ({
        ...prev,
        ...mockData
      }));
      setLoading(false);
    } catch (error) {
      showErrorToast('Failed to fetch GitHub profile');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement profile update logic
      showSuccessToast('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      showErrorToast('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Profile | MergeMate</title>
      </Helmet>
      <div className="profile-container container py-5 mt-3">
        <div className="row">
          {/* Profile Header */}
          <div className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="rounded-circle me-3"
                      width="100"
                      height="100"
                    />
                    <div>
                      <h2 className="mb-1">{profile.name}</h2>
                      <p className="text-muted mb-0">{profile.bio}</p>
                    </div>
                  </div>
                  <Button
                    variant="navbar"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    {/* Experience Level */}
                    <div className="mb-3">
                      <label className="form-label">Experience Level</label>
                      <select
                        className="form-select"
                        value={profile.experienceLevel}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          experienceLevel: e.target.value
                        }))}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-3">
                      <label className="form-label">Tech Stack</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., React, Node.js (comma-separated)"
                        value={profile.techStack.join(', ')}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          techStack: e.target.value.split(',').map(item => item.trim())
                        }))}
                      />
                    </div>

                    <Button type="submit" variant="navbar">
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div>
                    <h5>Experience Level</h5>
                    <p className="text-capitalize">{profile.experienceLevel}</p>
                    
                    <h5>Tech Stack</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {profile.techStack.map((tech, index) => (
                        <span key={index} className="badge bg-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GitHub Repositories */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>GitHub Repositories</h5>
                {profile.repositories.map((repo, index) => (
                  <div key={index} className="repo-card p-3 border rounded mb-2">
                    <h6>{repo.name}</h6>
                    <p className="small text-muted mb-1">{repo.description}</p>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <span>{repo.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile; 