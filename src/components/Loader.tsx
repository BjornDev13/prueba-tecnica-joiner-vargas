import './Loader.css';

interface LoaderProps {
  show: boolean;
}

const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className={`loader-overlay ${!show ? 'fade-out' : ''}`}>
      <div className="loader-container">
        <img src="/gif/kamehameha.gif" alt="Loading..." className="loader-gif" />
      </div>
    </div>
  );
};

export default Loader;
