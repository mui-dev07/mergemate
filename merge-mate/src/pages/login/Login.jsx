import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { GITHUB_CLIENT_ID } from '../../config/constants';
import { authenticateWithGithub, initiateGithubLogin } from '../../api/auth';
import Session from '../../utils/session';
import "../../styles/Login.css";

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
      // Move URL cleanup to after successful authentication
    }
  }, []);

  const handleGithubCallback = async (code) => {
    try {
      const response = await authenticateWithGithub(code);
      if (response && response.token) {  // Add null check
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

  console.log('GitHub Client ID:', GITHUB_CLIENT_ID);

  return (
    <>
      <Helmet>
        <title>Login | MergeMate</title>
      </Helmet>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <i className="bi bi-github"></i>
            <h1>Sign in to MergeMate</h1>
          </div>
          <div className="login-form-container">
            <button 
              onClick={handleGithubLogin}
              className="github-sign-in-btn"
            >
              <i className="bi bi-github"></i>
              Continue with GitHub
            </button>
            <button 
              onClick={handleContinueWithoutGithub}
              className="continue-without-github-btn"
            >
              Continue without GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;