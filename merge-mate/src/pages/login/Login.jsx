import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GITHUB_CLIENT_ID } from '../../config/constants';
import { authenticateWithGithub, initiateGithubLogin } from '../../api/auth';
import Session from '../../utils/session';
import "../../styles/Login.css";
import PageLayout from "../../components/PageLayout";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      console.error('GitHub OAuth error:', error);
      // Add user feedback for error
      alert('Failed to authenticate with GitHub. Please try again.');
      return;
    }

    if (code) {
      handleGithubCallback(code);
    }
  }, []);

  const handleGithubCallback = async (code) => {
    try {
      const response = await authenticateWithGithub(code);
      if (response && response.token) {
        // Store user data first
        Session.setUser(response.user);
        localStorage.setItem('accessToken', response.token);
        
        // Clear URL parameters after successful authentication
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Update authentication state
        setIsAuthenticated(true);
        
        // Navigate immediately without setTimeout
        navigate('/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleGithubLogin = () => {
    initiateGithubLogin();
  };

  const handleContinueWithoutGithub = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <PageLayout 
      title="Login" 
      description="Sign in to MergeMate"
      className="login-page"
    >
      <div className="login-box animate-fade-in">
        <div className="login-card">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="bi bi-git"></i>
            </div>
          </div>
          <h1 className="login-title">Sign in to MergeMate</h1>
          <div className="login-buttons">
            <button 
              onClick={handleGithubLogin}
              className="github-btn"
            >
              <i className="bi bi-github"></i>
              Continue with GitHub
            </button>
            <div className="divider">
              <span>or</span>
            </div>
            <button 
              onClick={handleContinueWithoutGithub}
              className="normal-btn"
            >
              Continue without GitHub
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Login;