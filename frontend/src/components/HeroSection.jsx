// frontend/src/components/HeroSection.jsx
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to Our Lady of Fatima Parish</h1>
        <p className="verse">"Many Cultures, One Faith"</p>
        <div className="hero-buttons">
          <button>Mass Times</button>
          <button>Events</button>
          <button>Donate</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;