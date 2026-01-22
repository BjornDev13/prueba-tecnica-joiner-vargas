import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.scss';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/characters');
    } else {
      setError('Invalid credentials. Try admin/admin123 or user/user123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Dragon Ball Manager</h1>
          <p>Sign in to manage characters and planets</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>

        <div className="login-info">
          <h3>Demo Credentials:</h3>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>User:</strong> user / user123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
