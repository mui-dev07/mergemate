import api from "./axios";
import Session from "../utils/session";
import {
  GITHUB_CLIENT_ID,
  API_BASE_URL,
  FRONTEND_URL,
} from "../config/constants";

export const login = async (credentials) => {
  const response = await api.post("/api/login", credentials);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await api.post("/api/logout");
    Session.clear();
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const user = Session.getUser();
    if (user) return user;

    const response = await api.get("/api/user");
    Session.setUser(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiateGithubLogin = () => {
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${GITHUB_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(FRONTEND_URL + '/github/callback')}`;

  window.location.assign(githubAuthUrl);
};

export const authenticateWithGithub = async (code) => {
  try {
    const response = await api.post(`/api/auth/github/callback`, { code });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      Session.setUser(response.data.user);
    }
    return response.data;
  } catch (error) {
    console.error("GitHub auth error:", error);
    throw error;
  }
};

export const getProfile = () => api.get("/profile");
export const updateProfile = (data) => api.put("/profile", data);
export const syncGithubProfile = () => api.post("/profile/sync-github");
export const getGithubRepositories = () => api.get("/profile/repositories");
