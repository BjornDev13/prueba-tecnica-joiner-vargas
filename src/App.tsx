import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Characters from './pages/Characters';
import Planets from './pages/Planets';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
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
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
