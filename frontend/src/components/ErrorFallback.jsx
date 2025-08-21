/**
 * Error Fallback Component
 *
 * Displays user-friendly error messages when components fail to load
 * Provides recovery options and maintains parish branding
 *
 * @param {Object} props Component props
 * @param {Error} props.error The error that occurred
 * @param {Function} props.resetErrorBoundary Function to reset the error boundary
 * @returns {JSX.Element} Error fallback UI
 */
import './ErrorFallback.css';
import { useLanguage } from '../context/LanguageContext';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const { language } = useLanguage();

  const errorMessages = {
    en: {
      title: 'Something went wrong',
      description: 'We apologize for the inconvenience. Please try refreshing the page.',
      button: 'Try Again',
      home: 'Go Home',
    },
    es: {
      title: 'Algo salió mal',
      description: 'Pedimos disculpas por las molestias. Por favor, intente actualizar la página.',
      button: 'Intentar de Nuevo',
      home: 'Ir al Inicio',
    },
  };

  const t = errorMessages[language];

  const handleRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-fallback">
      <div className="error-container">
        <div className="error-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h2 className="error-title">{t.title}</h2>
        <p className="error-description">{t.description}</p>

        {error?.message && (
          <details className="error-details">
            <summary>Technical Details</summary>
            <code>{error.message}</code>
          </details>
        )}

        <div className="error-actions">
          <button onClick={handleRefresh} className="error-button primary">
            {t.button}
          </button>
          <button onClick={handleGoHome} className="error-button secondary">
            {t.home}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
