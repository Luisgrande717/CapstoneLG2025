/**
 * Hero Section Component
 *
 * Main hero banner with parish welcome message and quick action buttons
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Hero section with call-to-action buttons
 */

import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useLanguage } from '../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>{t('heroTitle', { fallback: 'Welcome to Our Lady of Fatima Parish' })}</h1>
        <p className="verse">{t('heroSubtitle', { fallback: '"Many Cultures, One Faith"' })}</p>
        <div className="hero-buttons">
          <Link to="/mass">
            <button>{t('massTimesBtn', { fallback: 'Mass Times' })}</button>
          </Link>
          <Link to="/events">
            <button>{t('eventsBtn', { fallback: 'Events' })}</button>
          </Link>
          <Link to="/donate">
            <button>{t('donateBtn', { fallback: 'Donate' })}</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
