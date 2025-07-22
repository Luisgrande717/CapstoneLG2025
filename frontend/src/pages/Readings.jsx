// frontend/src/pages/Readings.jsx
import './Readings.css';

const Readings = () => {
  // 🔒 Use a short excerpt or headline—not full scripture text
  const todaySnippet = "Jesus said to his disciples, 'Do not be afraid...'";

  return (
    <section className="readings-page">
      <div className="readings-card">
        <h2>Daily Reading Snapshot</h2>

        <div className="reading-section">
          <h3>Today’s Gospel</h3>
          <p>{todaySnippet}</p>
          <a
            href="https://bible.usccb.org/daily-bible-reading"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="read-more-button">Read Full Passage</button>
          </a>
        </div>

        <div className="reading-section">
          <h3>Saint of the Day</h3>
          <p>Discover today's saint and their legacy in faith and service.</p>
          <a
            href="https://www.catholic.org/saints/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="read-more-button">Explore Saints</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Readings;