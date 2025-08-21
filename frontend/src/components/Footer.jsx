/**
 * Footer Component
 *
 * Site footer with parish information, contact details, and social media links
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Footer with parish info and social links
 */

import './Footer.css';
import { useLanguage } from '../context/LanguageContext';
import facebookIcon from '../assets/facebook-icon.png';
import instagramIcon from '../assets/insta.png';
import youtubeIcon from '../assets/youtube-icon.png';
import tiktokIcon from '../assets/tiktok-icon.png';

const Footer = () => {
  const { t } = useLanguage();

  const handleSubscribe = e => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="site-footer">
      <div className="footer-columns">
        {/* Parish Info */}
        <div>
          <h4>{t('parishName', { fallback: 'Our Lady of Fatima' })}</h4>
          <p>{t('parishAddress', { fallback: '123 Smith Street, Perth Amboy, NJ' })}</p>
          <p>{t('massTimesFooter', { fallback: 'Mass Times: Sat 5PM • Sun 9AM & 11AM' })}</p>
        </div>

        {/* Social Media + Contact */}
        <div>
          <h4>{t('connect', { fallback: 'Connect' })}</h4>
          <p>{t('emailLabel', { fallback: 'Email: contact@yourparish.org' })}</p>
          <p>{t('phoneLabel', { fallback: 'Phone: (732) 555-1234' })}</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="YouTube" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src={tiktokIcon} alt="TikTok" />
            </a>
          </div>
        </div>

        {/* Stay Connected Form */}
        <div>
          <h4>{t('stayConnected', { fallback: 'Stay Connected' })}</h4>
          <form className="connect-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={t('emailPlaceholder', { fallback: 'Your email' })}
              required
            />
            <button type="submit">{t('subscribe', { fallback: 'Subscribe' })}</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('copyright', { fallback: '© 2025 Our Lady of Fatima. All rights reserved.' })}</p>
      </div>
    </footer>
  );
};

export default Footer;
