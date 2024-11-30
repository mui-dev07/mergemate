import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import "../../styles/Login.css";

function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual authentication logic here
    setIsAuthenticated(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="sign-in-btn">
                Sign in
              </button>
            </form>
          </div>
          <div className="login-footer">
            <p>New to MergeMate? <a href="#">Create an account</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;