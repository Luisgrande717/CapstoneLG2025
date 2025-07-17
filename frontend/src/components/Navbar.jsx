// frontend/src/components/Navbar.jsx
import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // ← future-proof for routing

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/assets/church-logo2.png" alt="Parish Logo" />
        Our Lady of Fatima
      </div>
      <button className={`hamburger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mass">Mass Times</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/donate">Donate</Link></li>
        <li><Link to="/login" className="login-link">Member Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;