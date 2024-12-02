import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { GITHUB_CLIENT_ID } from '../../config/constants';
import { authenticateWithGithub } from '../../api/auth';
import "../../styles/Login.css";

function Login({ setIsAuthenticated }) {
  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleGithubCallback(code);
    }
  }, []);

  const handleGithubCallback = async (code) => {
    try {
      const response = await authenticateWithGithub(code);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
    window.location.href = githubAuthUrl;
  };

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
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;