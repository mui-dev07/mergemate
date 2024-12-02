import api from './axios';

export const login = async (credentials) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/logout');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/api/user');
  return response.data;
};

export const authenticateWithGithub = async (code) => {
  const response = await api.post('/api/auth/github', { code });
  return response.data;
};