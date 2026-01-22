import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeAApp = () => {
    navigate('/login');
    setTimeout(() => {
      logout();
    }, 100);
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/characters" className="navbar-brand">
          🐉 Administrador de Dragon Ball
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link to="/characters">Personajes</Link>
          </li>
          <li>
            <Link to="/planets">Planetas</Link>
          </li>
        </ul>

        <div className="user-info">
          <span className="user-name">{user?.username}</span>
          <span className="user-role">{user?.role}</span>
          <button onClick={closeAApp} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
