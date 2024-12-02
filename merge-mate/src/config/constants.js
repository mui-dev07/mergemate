// Check if environment variables are defined and provide fallbacks
export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const GITHUB_OAUTH_REDIRECT_URL = `${API_BASE_URL}/api/auth/github/callback`; 