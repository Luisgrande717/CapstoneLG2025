// frontend/src/pages/Readings.jsx
import './Readings.css';

const Readings = () => {
  return (
    <section className="readings-page">
      <div className="readings-card">
        <h2>Daily Readings</h2>
        <p>Stay spiritually nourished with daily scripture and reflections. This section will soon provide timely access to readings from the liturgical calendar.</p>

        {/* Future content examples */}
        <div className="reading-section">
          <h3>Today's Reading</h3>
          <p>Coming Soon: Full scripture text and commentary for today’s Mass.</p>
        </div>

        <div className="reading-section">
          <h3>Saint of the Day</h3>
          <p>Explore the lives of saints and the wisdom they shared through their service and spirituality.</p>
        </div>
      </div>
    </section>
  );
};

export default Readings;