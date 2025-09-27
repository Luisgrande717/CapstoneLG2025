/**
 * Events Page Component - Updated with Real API Integration
 * 
 * Displays parish events in an interactive calendar with dots for events
 * and detailed event information. Now fetches real events from the admin system.
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './Events.css';

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { t, language } = useLanguage();

  // Fetch all events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:8080/api/events');
        const events = response.data.data.events || [];
        
        setAllEvents(events);
        
        // Filter events for currently selected date
        filterEventsForDate(selectedDate, events);
        
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
        setAllEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events for a specific date
  const filterEventsForDate = (date, events = allEvents) => {
    const selectedDateStr = date.toISOString().split('T')[0];
    
    const eventsOnDate = events.filter(event => {
      const eventStartDate = new Date(event.startDate).toISOString().split('T')[0];
      const eventEndDate = new Date(event.endDate).toISOString().split('T')[0];
      
      // Check if selected date falls within event date range
      return selectedDateStr >= eventStartDate && selectedDateStr <= eventEndDate;
    });
    
    setEventsForDate(eventsOnDate);
  };

  // When selected date changes, filter events for that date
  useEffect(() => {
    filterEventsForDate(selectedDate);
  }, [selectedDate, allEvents]);

  // Check if a date has events (for calendar dots)
  const dateHasEvents = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    return allEvents.some(event => {
      const eventStartDate = new Date(event.startDate).toISOString().split('T')[0];
      const eventEndDate = new Date(event.endDate).toISOString().split('T')[0];
      
      return dateStr >= eventStartDate && dateStr <= eventEndDate;
    });
  };

  // Highlight calendar tiles with a dot if events exist for that day
  const getTileContent = ({ date, view }) => {
    if (view === 'month' && dateHasEvents(date)) {
      return <span className="event-dot" />;
    }
    return null;
  };

  if (isLoading) {
    return (
      <section style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>{t('events.loading', { fallback: 'Loading events...' })}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={styles.container}>
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.retryButton}
          >
            {t('events.retry', { fallback: 'Try Again' })}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>
        {t('events.title', { fallback: 'Events Calendar' })}
      </h2>

      {/* 📆 Centered calendar display with dots */}
      <div style={styles.calendarWrapper}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={getTileContent}
          className="custom-calendar"
        />
      </div>

      {/* 📋 Detailed event list below the calendar */}
      <div style={styles.detailsSection}>
        <h3 style={styles.subtitle}>
          {t('events.eventsOn', { 
            fallback: 'Events on {{date}}',
            date: selectedDate.toDateString()
          })}
        </h3>

        {eventsForDate.length > 0 ? (
          eventsForDate.map((event) => (
            <div key={event._id} style={styles.eventCard}>
              <h4 style={styles.eventTitle}>
                {event.title[language] || event.title.en || 'Untitled Event'}
              </h4>
              <p>
                <strong>{t('events.time', { fallback: 'Time:' })}</strong> {event.startTime} - {event.endTime}
              </p>
              <p>
                <strong>{t('events.location', { fallback: 'Location:' })}</strong> {event.location}
              </p>
              <p>
                <strong>{t('events.category', { fallback: 'Category:' })}</strong> {event.category}
              </p>
              <p>{event.description[language] || event.description.en || ''}</p>
              
              {event.contactInfo?.email && (
                <p>
                  <strong>{t('events.contact', { fallback: 'Contact:' })}</strong> {event.contactInfo.email}
                </p>
              )}
              
              {event.registrationRequired && (
                <p style={styles.registrationRequired}>
                  📝 {t('events.registrationRequired', { fallback: 'Registration Required' })}
                </p>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noEventText}>
            {t('events.noEvents', { fallback: 'No events scheduled for this day.' })}
          </p>
        )}
      </div>

      {/* Summary of upcoming events */}
      {allEvents.length > 0 && (
        <div style={styles.upcomingSection}>
          <h3 style={styles.subtitle}>
            {t('events.upcomingEvents', { fallback: 'All Upcoming Events' })}
          </h3>
          <div style={styles.upcomingGrid}>
            {allEvents
              .filter(event => new Date(event.startDate) >= new Date())
              .slice(0, 6)
              .map((event) => (
                <div key={event._id} style={styles.upcomingCard}>
                  <h5>{event.title[language] || event.title.en}</h5>
                  <p>{new Date(event.startDate).toLocaleDateString()}</p>
                  <p>{event.category}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

// 🎨 Inline styles with layout fixes and comments
const styles = {
  container: {
    minHeight: '100vh',
    padding: '80px 20px',
    backgroundColor: '#f4f2ec',
    display: 'flex', // ⬅️ Enable flex layout
    flexDirection: 'column',
    alignItems: 'center', // ⬅️ Center everything horizontally
    textAlign: 'center',
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '30px',
    color: '#312e2b',
  },
  calendarWrapper: {
    display: 'flex', // ⬅️ Center calendar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    width: '100%', // ⬅️ Prevent shrinking inside flex
  },
  detailsSection: {
    maxWidth: '700px',
    width: '100%',
    margin: '0 auto',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '1.6rem',
    marginBottom: '20px',
    color: '#312e2b',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  eventTitle: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#312e2b',
  },
  noEventText: {
    fontSize: '1.1rem',
    color: '#777',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #f0c987',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  errorText: {
    fontSize: '1.1rem',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  retryButton: {
    backgroundColor: '#f0c987',
    color: '#312e2b',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  registrationRequired: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  upcomingSection: {
    maxWidth: '1000px',
    width: '100%',
    margin: '40px auto 0',
    textAlign: 'left',
  },
  upcomingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  upcomingCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e5e9',
  },
};

export default Events;
