// frontend/src/components/EventsCarousel.jsx
import './EventsCarousel.css';
import { Link } from 'react-router-dom';

const sampleEvents = [
  {
    title: 'Community Rosary',
    date: 'July 20, 2025',
    time: '7:00 PM',
    description: 'Join us in prayer and fellowship every Thursday evening.'
  },
  {
    title: 'Youth Retreat',
    date: 'August 2–4, 2025',
    time: 'All Day',
    description: 'A weekend of spiritual renewal for teens and young adults.'
  },
  {
    title: 'Back-to-School Blessing',
    date: 'August 18, 2025',
    time: '11:00 AM Mass',
    description: 'We’ll celebrate and pray for students as the new year begins.'
  }
];

const EventsCarousel = () => {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Upcoming Events</h2>
      <div className="carousel-container">
        {sampleEvents.map((event, index) => (
          <Link
            to="/events"
            className="event-link"
            key={index}
            aria-label={`View details for ${event.title}`}
          >
            <div className="event-card">
              <h3>{event.title}</h3>
              <p>
                <strong>{event.date}</strong> &bull; {event.time}
              </p>
              <p>{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventsCarousel;