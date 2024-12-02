import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { authenticateWithGithub } from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/api/user");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Get CSRF cookie first
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("/api/login", credentials);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/logout");
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginWithGithub = async (code) => {
    try {
      const response = await authenticateWithGithub(code);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      loginWithGithub 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
