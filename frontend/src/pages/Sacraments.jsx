// frontend/src/pages/Sacraments.jsx
import './Sacraments.css';

const Sacraments = () => {
  return (
    <section className="sacraments-page">
      <div className="sacrament-card">
        <h2>Celebrating the Sacraments</h2>
        <p>Our Lady of Fatima Parish guides families through the sacred moments of Baptism, First Communion, and Confirmation.</p>

        <div className="sacrament-section">
          <h3>Baptism</h3>
          <p>Baptism is the first step in a lifelong journey of faith. We offer ceremonies for infants and preparation classes for parents and godparents.</p>
        </div>

        <div className="sacrament-section">
          <h3>First Communion</h3>
          <p>Children typically receive First Communion around age 7 after completing religious education. Our catechists help prepare both hearts and minds.</p>
        </div>

        <div className="sacrament-section">
          <h3>Confirmation</h3>
          <p>Confirmation completes initiation into the Church. Our program supports youth and adults in embracing their spiritual maturity through study, service, and prayer.</p>
        </div>
      </div>
    </section>
  );
};

export default Sacraments;