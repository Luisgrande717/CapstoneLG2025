// frontend/src/components/Navbar.jsx
import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/assets/church-logo2.png" alt="Parish Logo" />
                Our Lady of Fatima
            </div>

            <button
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/">{language === 'en' ? 'Home' : 'Inicio'}</Link></li>
                <li><Link to="/mass">{language === 'en' ? 'Mass Times' : 'Horario de Misa'}</Link></li>
                <li><Link to="/events">{language === 'en' ? 'Events' : 'Eventos'}</Link></li>
                <li><Link to="/donate">{language === 'en' ? 'Donate' : 'Donar'}</Link></li>
                <li><Link to="/login" className="login-link">{language === 'en' ? 'Member Login' : 'Acceso de Miembro'}</Link></li>
                <li className="lang-item">
                    <button onClick={toggleLanguage} className="lang-toggle">
                        {language === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
                    </button>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;