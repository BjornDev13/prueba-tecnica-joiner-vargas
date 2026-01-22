import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/characters" className="navbar-brand">
          🐉 Dragon Ball Manager
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/planets">Planets</Link>
          </li>
        </ul>

        <div className="user-info">
          <span className="user-name">{user?.username}</span>
          <span className="user-role">{user?.role}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
