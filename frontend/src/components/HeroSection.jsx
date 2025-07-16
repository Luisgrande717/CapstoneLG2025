// frontend/src/components/HeroSection.jsx
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>Welcome to St. Martin de Porres Parish</h1>
        <p className="verse">
          “Let all that you do be done in love.” – 1 Corinthians 16:14
        </p>
        <div className="hero-buttons">
          <button>View Bulletin</button>
          <button>Mass Schedule</button>
          <button>Submit a Prayer</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;