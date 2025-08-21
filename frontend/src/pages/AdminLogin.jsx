/**
 * Admin Login Page Component
 * 
 * Secure login interface for parish administrators and moderators
 * with form validation and error handling
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    credential: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    const from = location.state?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.credential.trim()) {
      newErrors.credential = t('admin.login.errors.credentialRequired', { 
        fallback: 'Email or username is required' 
      });
    }

    if (!formData.password) {
      newErrors.password = t('admin.login.errors.passwordRequired', { 
        fallback: 'Password is required' 
      });
    } else if (formData.password.length < 6) {
      newErrors.password = t('admin.login.errors.passwordTooShort', { 
        fallback: 'Password must be at least 6 characters' 
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await login(formData.credential, formData.password);
      
      if (!result.success) {
        setErrors({ 
          general: result.error || t('admin.login.errors.loginFailed', { 
            fallback: 'Login failed. Please check your credentials.' 
          })
        });
      }
    } catch (error) {
      console.error('Login submission error:', error);
      setErrors({ 
        general: t('admin.login.errors.serverError', { 
          fallback: 'Server error. Please try again later.' 
        })
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clear general error when form data changes
   */
  useEffect(() => {
    if (errors.general && (formData.credential || formData.password)) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  }, [formData.credential, formData.password, errors.general]);

  if (isLoading) {
    return (
      <div className="admin-login-loading">
        <div className="loading-spinner"></div>
        <p>{t('admin.login.loading', { fallback: 'Loading...' })}</p>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <img 
            src="/assets/church-logo2.png" 
            alt={t('logoAlt', { fallback: 'Our Lady of Fatima Parish Logo' })}
            className="admin-login-logo"
          />
          <h1>{t('admin.login.title', { fallback: 'Admin Login' })}</h1>
          <p>{t('admin.login.subtitle', { fallback: 'Parish Administration Portal' })}</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="credential">
              {t('admin.login.labels.credential', { fallback: 'Email or Username' })}
            </label>
            <input
              type="text"
              id="credential"
              name="credential"
              value={formData.credential}
              onChange={handleChange}
              className={errors.credential ? 'error' : ''}
              placeholder={t('admin.login.placeholders.credential', { 
                fallback: 'Enter your email or username' 
              })}
              autoComplete="username"
              disabled={isSubmitting}
            />
            {errors.credential && (
              <span className="error-message">{errors.credential}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              {t('admin.login.labels.password', { fallback: 'Password' })}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder={t('admin.login.placeholders.password', { 
                fallback: 'Enter your password' 
              })}
              autoComplete="current-password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="admin-login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                {t('admin.login.buttons.signing_in', { fallback: 'Signing In...' })}
              </>
            ) : (
              t('admin.login.buttons.sign_in', { fallback: 'Sign In' })
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            {t('admin.login.footer.authorized', { 
              fallback: 'Authorized Personnel Only' 
            })}
          </p>
          <p>
            {t('admin.login.footer.contact', { 
              fallback: 'For access, contact the parish office' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;