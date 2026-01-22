import { Link } from 'react-router-dom';
import '../styles/components/_Errors.scss';

const Forbidden = () => {
  return (
    <div className="error-page">
      <h1>403 - Forbidden</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/" className="btn">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Forbidden;
