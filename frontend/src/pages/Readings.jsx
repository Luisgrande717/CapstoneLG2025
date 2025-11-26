import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Readings.css';

const Readings = () => {
  const [reading, setReading] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't fetched yet, or if reading is null
    if (!hasFetched.current || !reading) {
      setLoading(true);
      setError(false);

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
            hasFetched.current = true;
          }
        })
        .catch(err => {
          console.error('[Frontend] Failed to fetch reading:', err.message);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [reading]); // Only re-run if reading becomes null

  return (
    <section className="readings-page">
      <div className="readings-card">
        <h2>📖 {t('dailyReadings')}</h2>

        {loading ? (
          <p>⏳ {t('loading')}</p>
        ) : error ? (
          <p>⚠️ {t('error')}</p>
        ) : reading ? (
          <>
            <h3>{reading.title}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{reading.excerpt}</p>

            <a href={reading.link} target="_blank" rel="noopener noreferrer">
              <button className="read-more-button">{t('readMore')}</button>
            </a>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default Readings;
