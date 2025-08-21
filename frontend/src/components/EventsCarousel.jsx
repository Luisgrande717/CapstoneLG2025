/**
 * Events Carousel Component
 *
 * Displays upcoming parish events in a scrollable carousel format
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Events carousel with sample parish events
 */

import './EventsCarousel.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const EventsCarousel = () => {
  const { t } = useLanguage();

  // Define events with translation keys
  const sampleEvents = [
    {
      titleKey: 'communityRosary',
      dateKey: 'communityRosaryDate',
      timeKey: 'communityRosaryTime',
      descriptionKey: 'communityRosaryDesc',
      fallbackTitle: 'Community Rosary',
      fallbackDate: 'July 20, 2025',
      fallbackTime: '7:00 PM',
      fallbackDesc: 'Join us in prayer and fellowship every Thursday evening.',
    },
    {
      titleKey: 'youthRetreat',
      dateKey: 'youthRetreatDate',
      timeKey: 'youthRetreatTime',
      descriptionKey: 'youthRetreatDesc',
      fallbackTitle: 'Youth Retreat',
      fallbackDate: 'August 2–4, 2025',
      fallbackTime: 'All Day',
      fallbackDesc: 'A weekend of spiritual renewal for teens and young adults.',
    },
    {
      titleKey: 'backToSchool',
      dateKey: 'backToSchoolDate',
      timeKey: 'backToSchoolTime',
      descriptionKey: 'backToSchoolDesc',
      fallbackTitle: 'Back-to-School Blessing',
      fallbackDate: 'August 18, 2025',
      fallbackTime: '11:00 AM Mass',
      fallbackDesc: "We'll celebrate and pray for students as the new year begins.",
    },
  ];

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">
        {t('upcomingEventsTitle', { fallback: 'Upcoming Events' })}
      </h2>
      <div className="carousel-container">
        {sampleEvents.map((event, index) => (
          <Link
            to="/events"
            className="event-link"
            key={index}
            aria-label={`View details for ${t(event.titleKey, { fallback: event.fallbackTitle })}`}
          >
            <div className="event-card">
              <h3>{t(event.titleKey, { fallback: event.fallbackTitle })}</h3>
              <p>
                <strong>{t(event.dateKey, { fallback: event.fallbackDate })}</strong> &bull;{' '}
                {t(event.timeKey, { fallback: event.fallbackTime })}
              </p>
              <p>{t(event.descriptionKey, { fallback: event.fallbackDesc })}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventsCarousel;
