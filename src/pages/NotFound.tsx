import { Link } from 'react-router-dom';
import '../styles/components/_Errors.scss';

const NotFound = () => {
  return (
    <div className="error-page">
      <h1>404 - Not Found</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
