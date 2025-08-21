/**
 * Navigation Component for Our Lady of Fatima Parish Website
 *
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Bilingual navigation with language toggle
 * - Accessible keyboard navigation
 * - Active route highlighting
 * - Smooth animations and transitions
 *
 * @returns {JSX.Element} Navigation bar component
 */

import './Navbar.css';
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * Navigation menu configuration
 * Centralized for easy maintenance and updates
 */
const NAV_ITEMS = [
  { path: '/', key: 'home' },
  { path: '/mass', key: 'mass' },
  { path: '/events', key: 'events' },
  { path: '/readings', key: 'readings' },
  { path: '/sacraments', key: 'sacraments' },
  { path: '/volunteer', key: 'volunteer' },
  { path: '/donate', key: 'donate' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [member, setMember] = useState(null);
  const { language, toggleLanguage, t, isLoading } = useLanguage();
  const location = useLocation();

  /**
   * Check for logged in member
   */
  useEffect(() => {
    const checkMemberAuth = async () => {
      const token = localStorage.getItem('memberToken');
      if (token) {
        try {
          const response = await fetch('/api/members/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setMember(data.data.member);
          } else {
            localStorage.removeItem('memberToken');
            setMember(null);
          }
        } catch (error) {
          console.error('Member auth check failed:', error);
          localStorage.removeItem('memberToken');
          setMember(null);
        }
      }
    };

    checkMemberAuth();
  }, []);

  /**
   * Handle member logout
   */
  const handleMemberLogout = () => {
    localStorage.removeItem('memberToken');
    setMember(null);
    setIsOpen(false);
  };

  /**
   * Handles scroll effect for navbar styling
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Closes mobile menu when route changes
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /**
   * Closes mobile menu
   */
  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Toggles mobile menu with proper accessibility
   */
  const toggleMobileMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  /**
   * Handles keyboard navigation for mobile menu
   */
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  /**
   * Handles language toggle with loading state
   */
  const handleLanguageToggle = useCallback(() => {
    if (!isLoading) {
      toggleLanguage();
    }
  }, [toggleLanguage, isLoading]);

  /**
   * Checks if current path is active
   */
  const isActivePath = useCallback(
    path => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* Logo and Parish Name - Top Section */}
        <div className="navbar-header">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img
              src="/assets/church-logo2.png"
              alt={t('logoAlt', { fallback: 'Our Lady of Fatima Parish Logo' })}
              width="50"
              height="50"
              loading="eager"
            />
            <span className="parish-name">{t('parishName', { fallback: 'Our Lady of Fatima' })}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            onKeyDown={handleKeyDown}
            aria-label={t('toggleMenu', { fallback: 'Toggle navigation menu' })}
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Navigation Menu - Bottom Section */}
        <ul id="navigation-menu" className={`nav-links ${isOpen ? 'open' : ''}`} role="menubar">
          {NAV_ITEMS.map(({ path, key }) => (
            <li key={path} role="none">
              <Link
                to={path}
                className={`nav-link ${isActivePath(path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
                role="menuitem"
                aria-current={isActivePath(path) ? 'page' : undefined}
              >
                {t(`nav.${key}`, { fallback: key })}
              </Link>
            </li>
          ))}

          {/* Member Authentication */}
          {member ? (
            <li className="member-info" role="none">
              <span className="member-name">
                {t('welcome', { fallback: 'Welcome' })}, {member.firstName}
              </span>
              <button
                onClick={handleMemberLogout}
                className="logout-button"
                role="menuitem"
                aria-label={t('logout', { fallback: 'Logout' })}
              >
                {t('logout', { fallback: 'Logout' })}
              </button>
            </li>
          ) : (
            <li className="auth-item" role="none">
              <Link
                to="/login"
                className={`nav-link login-link ${isActivePath('/login') ? 'active' : ''}`}
                onClick={closeMobileMenu}
                role="menuitem"
                aria-current={isActivePath('/login') ? 'page' : undefined}
              >
                {t('nav.login', { fallback: 'Member Login' })}
              </Link>
            </li>
          )}

          {/* Language Toggle */}
          <li className="lang-item" role="none">
            <button
              onClick={handleLanguageToggle}
              className={`lang-toggle ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              role="menuitem"
              aria-label={t('toggleLanguage', { fallback: 'Switch language' })}
            >
              {isLoading ? '...' : language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Overlay */}
        {isOpen && <div className="mobile-overlay" onClick={closeMobileMenu} aria-hidden="true" />}
      </div>
    </nav>
  );
};

export default Navbar;
