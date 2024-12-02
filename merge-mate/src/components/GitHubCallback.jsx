import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authenticateWithGithub } from '../api/auth';

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/login');
      return;
    }

    authenticateWithGithub(code)
      .then((data) => {
        if (data.token) {
          login(data);
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        navigate('/login');
      });
  }, [searchParams, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-2">Authenticating with GitHub...</span>
    </div>
  );
} 