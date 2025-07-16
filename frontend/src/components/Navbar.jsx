// frontend/src/components/Navbar.jsx
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/assets/church-logo.png" alt="Church Logo" />
        <h1>St. Martin de Porres</h1>
      </div>

      <nav className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Mass Times</a>
        <a href="#">Ministries</a>
        <a href="#">Events</a>
        <a href="#">Contact</a>
      </nav>

      <div className="navbar-toggle">
        {/* Future feature: Theme toggle or login */}
        <button>☀️</button>
      </div>
    </header>
  );
};

export default Navbar;