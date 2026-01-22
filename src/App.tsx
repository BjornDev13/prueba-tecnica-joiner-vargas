import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import './styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/characters"
            element={
              <PrivateRoute>
                <Navbar />
                <Characters />
              </PrivateRoute>
            }
          />
          <Route
            path="/planets"
            element={
              <PrivateRoute>
                <Navbar />
                <Planets />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
