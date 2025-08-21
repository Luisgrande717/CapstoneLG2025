/**
 * Member Login and Registration Page
 * 
 * Provides secure member authentication with login and registration forms
 * for parish community members to access exclusive content and features
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [member, setMember] = useState(null);
  
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form data
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    preferredLanguage: language || 'en'
  });

  // Check if member is already logged in
  useEffect(() => {
    const token = localStorage.getItem('memberToken');
    if (token) {
      // Verify token and get member info
      verifyToken(token);
    }
  }, []);

  /**
   * Verify stored token and get member info
   */
  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/members/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMember(response.data.data.member);
    } catch (error) {
      // Token invalid, remove it
      localStorage.removeItem('memberToken');
    }
  };

  /**
   * Handle login form input changes
   */
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handle registration form input changes
   */
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate login form
   */
  const validateLogin = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = t('members.login.errors.emailRequired', { fallback: 'Email is required' });
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email)) {
      newErrors.email = t('members.login.errors.emailInvalid', { fallback: 'Please enter a valid email' });
    }

    if (!loginData.password) {
      newErrors.password = t('members.login.errors.passwordRequired', { fallback: 'Password is required' });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate registration form
   */
  const validateRegistration = () => {
    const newErrors = {};

    if (!registerData.firstName.trim()) {
      newErrors.firstName = t('members.register.errors.firstNameRequired', { fallback: 'First name is required' });
    }

    if (!registerData.lastName.trim()) {
      newErrors.lastName = t('members.register.errors.lastNameRequired', { fallback: 'Last name is required' });
    }

    if (!registerData.email.trim()) {
      newErrors.email = t('members.register.errors.emailRequired', { fallback: 'Email is required' });
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerData.email)) {
      newErrors.email = t('members.register.errors.emailInvalid', { fallback: 'Please enter a valid email' });
    }

    if (!registerData.password) {
      newErrors.password = t('members.register.errors.passwordRequired', { fallback: 'Password is required' });
    } else if (registerData.password.length < 6) {
      newErrors.password = t('members.register.errors.passwordTooShort', { fallback: 'Password must be at least 6 characters' });
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = t('members.register.errors.passwordMismatch', { fallback: 'Passwords do not match' });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle login submission
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) return;

    setIsLoading(true);
    setErrors({});
    setSuccess('');

    try {
      const response = await axios.post('/api/members/login', loginData);
      const { token, member: memberData } = response.data.data;
      
      // Store token
      localStorage.setItem('memberToken', token);
      
      // Set member data
      setMember(memberData);
      
      setSuccess(t('members.login.success', { 
        fallback: 'Welcome back, {{name}}!',
        name: memberData.firstName
      }));

      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: error.response?.data?.error || t('members.login.errors.failed', { fallback: 'Login failed. Please try again.' })
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle registration submission
   */
  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!validateRegistration()) return;

    setIsLoading(true);
    setErrors({});
    setSuccess('');

    try {
      const response = await axios.post('/api/members/register', registerData);
      const { token, member: memberData } = response.data.data;
      
      // Store token
      localStorage.setItem('memberToken', token);
      
      // Set member data
      setMember(memberData);
      
      setSuccess(t('members.register.success', { 
        fallback: 'Welcome to Our Lady of Fatima Parish, {{name}}!',
        name: memberData.firstName
      }));

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general: error.response?.data?.error || t('members.register.errors.failed', { fallback: 'Registration failed. Please try again.' })
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    localStorage.removeItem('memberToken');
    setMember(null);
    setLoginData({ email: '', password: '' });
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      preferredLanguage: language || 'en'
    });
    setSuccess('');
    setErrors({});
  };

  // If member is logged in, show member dashboard
  if (member) {
    return (
      <section className="login-page">
        <div className="member-dashboard">
          <div className="welcome-header">
            <h2>{t('members.dashboard.welcome', { fallback: 'Welcome, {{name}}!', name: member.firstName })}</h2>
            <p className="membership-status">
              {t('members.dashboard.status', { fallback: 'Membership Status: ' })}
              <span className={`status ${member.membershipStatus}`}>
                {member.membershipStatus}
              </span>
            </p>
          </div>

          <div className="member-info">
            <h3>{t('members.dashboard.info', { fallback: 'Your Information' })}</h3>
            <p><strong>{t('members.dashboard.name', { fallback: 'Name:' })}</strong> {member.fullName}</p>
            <p><strong>{t('members.dashboard.email', { fallback: 'Email:' })}</strong> {member.email}</p>
            <p><strong>{t('members.dashboard.memberSince', { fallback: 'Member Since:' })}</strong> {new Date(member.memberSince).toLocaleDateString()}</p>
            <p><strong>{t('members.dashboard.language', { fallback: 'Preferred Language:' })}</strong> {member.preferredLanguage === 'en' ? 'English' : 'Español'}</p>
          </div>

          <div className="member-actions">
            <button className="btn-secondary">
              {t('members.dashboard.editProfile', { fallback: 'Edit Profile' })}
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              {t('members.dashboard.logout', { fallback: 'Logout' })}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="login-page">
      <div className="login-card">
        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            {t('members.tabs.login', { fallback: 'Login' })}
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            {t('members.tabs.register', { fallback: 'Register' })}
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>{t('members.login.title', { fallback: 'Member Login' })}</h2>
            <p>{t('members.login.subtitle', { fallback: 'Access your parish member account' })}</p>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder={t('members.login.placeholders.email', { fallback: 'Email Address' })}
                value={loginData.email}
                onChange={handleLoginChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder={t('members.login.placeholders.password', { fallback: 'Password' })}
                value={loginData.password}
                onChange={handleLoginChange}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading 
                ? t('members.login.loading', { fallback: 'Signing In...' })
                : t('members.login.button', { fallback: 'Sign In' })
              }
            </button>
          </form>
        ) : (
          // Registration Form
          <form onSubmit={handleRegistration} className="auth-form">
            <h2>{t('members.register.title', { fallback: 'Join Our Parish' })}</h2>
            <p>{t('members.register.subtitle', { fallback: 'Become a member of Our Lady of Fatima' })}</p>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder={t('members.register.placeholders.firstName', { fallback: 'First Name' })}
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  className={errors.firstName ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder={t('members.register.placeholders.lastName', { fallback: 'Last Name' })}
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  className={errors.lastName ? 'error' : ''}
                  disabled={isLoading}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder={t('members.register.placeholders.email', { fallback: 'Email Address' })}
                value={registerData.email}
                onChange={handleRegisterChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder={t('members.register.placeholders.phone', { fallback: 'Phone (Optional)' })}
                value={registerData.phone}
                onChange={handleRegisterChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder={t('members.register.placeholders.password', { fallback: 'Password' })}
                value={registerData.password}
                onChange={handleRegisterChange}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('members.register.placeholders.confirmPassword', { fallback: 'Confirm Password' })}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isLoading}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <select
                name="preferredLanguage"
                value={registerData.preferredLanguage}
                onChange={handleRegisterChange}
                disabled={isLoading}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading 
                ? t('members.register.loading', { fallback: 'Creating Account...' })
                : t('members.register.button', { fallback: 'Join Parish' })
              }
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Login;
