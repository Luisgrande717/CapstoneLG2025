// frontend/src/pages/Mass.jsx
import './mass.css';

const Mass = () => {
  return (
    <section className="mass-page">
      <div className="mass-card">
        <h2>Mass Schedule</h2>

        <div className="mass-section">
          <h3>Daily</h3>
          <p>
            7:00am (Español)<br />
            6:30pm (Español)
          </p>
        </div>

        <div className="mass-section">
          <h3>Saturday</h3>
          <p>6:30pm (Español) — Misa Vigilia</p>
        </div>

        <div className="mass-section">
          <h3>Sunday</h3>
          <ul>
            <li>9:00am (Español)</li>
            <li>11:00am (English)</li>
            <li>1:00pm (Español)</li>
            <li>5:30pm (Español)</li>
            <li>7:30pm (Bilingual)</li>
          </ul>
        </div>

        <div className="mass-section">
          <h3>Confessions</h3>
          <p>Saturday: 5:00pm – 6:00pm</p>
          <p>Also by appointment through the parish office</p>
        </div>

        <img
          src="/assets/front-office.jpg"
          alt="Parish Front Office"
          className="mass-image"
        />
      </div>
    </section>
  );
};

export default Mass;