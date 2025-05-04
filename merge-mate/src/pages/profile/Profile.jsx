import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import '../../styles/Profile.css';
import PageLayout from '../../components/PageLayout';

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
    return (
      <PageLayout title="Profile">
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Profile header component
  const ProfileHeader = (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
      <h2 className="mb-0">Your Profile</h2>
      <Button
        variant="outline-primary"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </Button>
    </div>
  );

  return (
    <PageLayout 
      title="Profile" 
      description="Manage your MergeMate profile"
      header={ProfileHeader}
    >
      <div className="profile-container">
        <div className="row g-4">
          {/* Profile Summary */}
          <div className="col-12">
            <div className="card profile-card shadow-sm">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="rounded-circle profile-image"
                    width="100"
                    height="100"
                  />
                  <div>
                    <h3 className="mb-1">{profile.name}</h3>
                    <p className="mb-1 text-muted">{profile.bio}</p>
                    <div className="d-flex flex-wrap gap-3 mt-2">
                      {profile.location && (
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt me-1"></i>
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.company && (
                        <div className="d-flex align-items-center">
                          <i className="bi bi-building me-1"></i>
                          <span>{profile.company}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-md-8">
            <div className="card profile-card shadow-sm h-100">
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

                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div>
                    <h5 className="card-title">Experience Level</h5>
                    <p className="text-capitalize mb-4">{profile.experienceLevel}</p>
                    
                    <h5 className="card-title">Tech Stack</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {profile.techStack.length > 0 ? (
                        profile.techStack.map((tech, index) => (
                          <span key={index} className="badge tech-badge">
                            {tech}
                          </span>
                        ))
                      ) : (
                        <p className="text-muted">No tech stack added yet</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GitHub Repositories */}
          <div className="col-md-4">
            <div className="card profile-card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">GitHub Repositories</h5>
                {profile.repositories.length > 0 ? (
                  profile.repositories.map((repo, index) => (
                    <div key={index} className="repo-card p-3 border rounded mb-2">
                      <h6 className="repo-name">{repo.name}</h6>
                      <p className="small text-muted mb-1">{repo.description}</p>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No repositories found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile; 