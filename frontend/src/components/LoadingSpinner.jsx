/**
 * Loading Spinner Component
 *
 * Displays a loading spinner with parish branding while content loads
 * Used for lazy-loaded routes and async operations
 *
 * @returns {JSX.Element} Loading spinner with spiritual styling
 */
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
