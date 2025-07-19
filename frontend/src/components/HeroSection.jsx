// frontend/src/components/HeroSection.jsx
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to Our Lady of Fatima Parish</h1>
        <p className="verse">"Many Cultures, One Faith"</p>
        <div className="hero-buttons">
          <Link to="/mass"><button>Mass Times</button></Link>
          <Link to="/events"><button>Events</button></Link>
          <Link to="/donate"><button>Donate</button></Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;