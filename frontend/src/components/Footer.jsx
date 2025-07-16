// frontend/src/components/Footer.jsx
import './Footer.css';
import facebookIcon from '../assets/facebook-icon.png';
import instagramIcon from '../assets/instagram-icon.png';
import youtubeIcon from '../assets/youtube-icon.png';
import tiktokIcon from '../assets/tiktok-icon.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-columns">
        {/* Parish Info */}
        <div>
          <h4>Our Lady of Fatima</h4>
          <p>123 Smith Street, Perth Amboy, NJ</p>
          <p>Mass Times: Sat 5PM • Sun 9AM & 11AM</p>
        </div>

        {/* Social Media + Contact */}
        <div>
          <h4>Connect</h4>
          <p>Email: contact@yourparish.org</p>
          <p>Phone: (732) 555-1234</p>
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
          <h4>Stay Connected</h4>
          <form className="connect-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 St. Martin de Porres Parish. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;