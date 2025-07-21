// frontend/src/pages/Events.jsx
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { mockEvents } from '../data/eventData';
import './Events.css'; // new custom calendar styles

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);

  useEffect(() => {
    const key = selectedDate.toISOString().split('T')[0];
    setEventsForDate(mockEvents[key] || []);
  }, [selectedDate]);

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const key = date.toISOString().split('T')[0];
      if (mockEvents[key]) {
        return <span className="event-dot" />;
      }
    }
    return null;
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Events Calendar</h2>

      <div style={styles.calendarWrapper}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={getTileContent} // ✅ adds dots to event days
          className="custom-calendar"
        />
      </div>

      <div style={styles.detailsSection}>
        <h3 style={styles.subtitle}>Events on {selectedDate.toDateString()}</h3>
        {eventsForDate.length > 0 ? (
          eventsForDate.map((event, index) => (
            <div key={index} style={styles.eventCard}>
              <h4 style={styles.eventTitle}>{event.title}</h4>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p style={styles.noEventText}>No events scheduled for this day.</p>
        )}
      </div>
    </section>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '80px 20px',
    backgroundColor: '#f4f2ec',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '30px',
    color: '#312e2b'
  },
  calendarWrapper: {
    maxWidth: '420px',
    margin: '0 auto',
    marginBottom: '40px'
  },
  detailsSection: {
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: '1.6rem',
    marginBottom: '20px',
    color: '#312e2b'
  },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },
  eventTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#312e2b'
  },
  noEventText: {
    fontSize: '1.1rem',
    color: '#777'
  }
};

export default Events;