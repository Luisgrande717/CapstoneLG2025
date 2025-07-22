import { useEffect, useState } from 'react';
import './Readings.css';

const Readings = () => {
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/readings/today')
      .then(res => res.json())
      .then(data => {
        console.log('[Frontend] Fetched reading:', data);
        console.log('[Excerpt length]', data?.excerpt?.length);

        // ✅ Safer validation logic
        if (
          !data ||
          typeof data.excerpt !== 'string' ||
          data.excerpt.trim().length < 50 ||
          data.excerpt.toLowerCase().includes('reading not available')
        ) {
          setError(true);
        } else {
          setReading(data);
        }
      })
      .catch(err => {
        console.error('[Frontend] Failed to fetch reading:', err.message);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="readings-page">
      <div className="readings-card">
        <h2>📖 Daily Reading Snapshot</h2>

        {loading ? (
          <p>⏳ Loading today’s scripture...</p>
        ) : error ? (
          <p>⚠️ Unable to load today’s reading. Please check back later.</p>
        ) : reading ? (
          <>
            <h3>{reading.title}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{reading.excerpt}</p>

            <a
              href={reading.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="read-more-button">
                Read Full Passage at USCCB
              </button>
            </a>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Readings;