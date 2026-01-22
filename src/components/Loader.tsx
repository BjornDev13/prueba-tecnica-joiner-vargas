import './Loader.css';

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className={`loader-overlay ${!show ? 'fade-out' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
