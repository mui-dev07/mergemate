import { API_BASE_URL } from '../config/constants';

export const authenticateWithGithub = async (code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/github`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    return await response.json();
  } catch (error) {
    throw new Error('Authentication failed');
  }
};