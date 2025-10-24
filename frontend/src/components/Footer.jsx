/**
 * Footer Component
 *
 * Site footer with parish information, contact details, and social media links
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Footer with parish info and social links
 */

import { useState } from 'react';
import axios from 'axios';
import './Footer.css';
import { useLanguage } from '../context/LanguageContext';
import facebookIcon from '../assets/facebook-icon.png';
import instagramIcon from '../assets/insta.png';
import youtubeIcon from '../assets/youtube-icon.png';
import tiktokIcon from '../assets/tiktok-icon.png';

const Footer = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage(t('emailRequired', { fallback: 'Email is required' }));
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post('http://localhost:8080/api/subscriptions/subscribe', {
        email,
        preferredLanguage: language,
        source: 'footer'
      });

      setMessage(response.data.message);
      setIsError(false);
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);

    } catch (error) {
      console.error('Subscription error:', error);
      setMessage(
        error.response?.data?.error || 
        t('subscriptionError', { fallback: 'Failed to subscribe. Please try again.' })
      );
      setIsError(true);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setIsError(false);
      }, 5000);

    } finally {
      setIsLoading(false);
    }4
  };

  return (
    <footer className="site-footer">
      <div className="footer-columns">
        {/* Parish Info */}
        <div>
          <h4>{t('parishName', { fallback: 'Our Lady of Fatima' })}</h4>
          <p>{t('parishAddress', { fallback: '380 Smith Street, Perth Amboy, NJ' })}</p>
          <p>{t('massTimesFooter', { fallback: 'Office Hours Mon - Fri 9:00am - 01:00pm (01:00pm - 02:00pm Lunch) 02:00pm - 05:00pm:: Sat 09:00am - 12:00pm • Sun CLOSED' })}</p>
        </div>

        {/* Social Media + Contact */}
        <div>
          <h4>{t('connect', { fallback: 'Connect' })}</h4>
          <p>{t('emailLabel', { fallback: 'Email: olfperthamboy@gmail.com' })}</p>
          <p>{t('phoneLabel', { fallback: 'Phone: (732) 442-6634' })}</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/OurLadyOfFatimaParishInPerthAmboy/?eid=ARBoOUi3O7EYX1BdnJft2AWJr1lu8B4-9MwyHdxcS9qpXmUvgQa6P1EPLGvV2AKyOn8MjrTSgkL0x5ry" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://www.youtube.com/@ourladyoffatimaperthamboyn7906" target="_blank" rel="noopener noreferrer">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder', { fallback: 'Your email' })}
              disabled={isLoading}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading 
                ? t('subscribing', { fallback: 'Subscribing...' })
                : t('subscribe', { fallback: 'Subscribe' })
              }
            </button>
          </form>
          {message && (
            <div className={`subscription-message ${isError ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('copyright', { fallback: '© 2025 Our Lady of Fatima. All rights reserved.' })}</p>
      </div>
    </footer>
  );
};

export default Footer;
