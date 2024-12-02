// Log the environment variable to debug
console.log('Raw env variable:', import.meta.env.VITE_GITHUB_CLIENT_ID);

export const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
if (!GITHUB_CLIENT_ID) {
    console.error('GitHub Client ID is not defined in environment variables');
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://mergemateback.wuaze.com/api/';
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://mergemate.wuaze.com';
export const GITHUB_CALLBACK_PATH = '/github/callback';