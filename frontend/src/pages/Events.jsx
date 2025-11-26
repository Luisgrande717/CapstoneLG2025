/**
 * Events Page Component - Google Calendar Integration
 *
 * Displays parish events from Google Calendar (olfperthamboy@gmail.com)
 * Shows both an embedded Google Calendar and synchronized event cards.
 *
 * @author Parish Development Team
 * @version 3.0.0
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import GoogleCalendarEmbed from '../components/GoogleCalendarEmbed';
import API_URL from '../config/api';
import './Events.css';

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t, language } = useLanguage();

  // Fetch synced events from API (these come from Google Calendar)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/api/events`);
        const events = response.data.data.events || [];

        // Filter for upcoming events only
        const upcoming = events
          .filter(event => new Date(event.startDate) >= new Date())
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        setUpcomingEvents(upcoming);

      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
        setUpcomingEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>
        {t('events.title', { fallback: 'Parish Calendar' })}
      </h2>

      <p style={styles.subtitle}>
        {t('events.description', {
          fallback: 'View all parish events and activities. Events are automatically synced from our Google Calendar.'
        })}
      </p>

      {/* Google Calendar Embed - Primary Calendar */}
      <div style={styles.googleCalendarSection}>
        <GoogleCalendarEmbed
          calendarId="olfperthamboy@gmail.com"
          timezone="America/New_York"
        />
      </div>

      {/* Upcoming Events Cards */}
      <div style={styles.upcomingSection}>
        <h3 style={styles.sectionTitle}>
          {t('events.upcomingEvents', { fallback: 'Upcoming Events' })}
        </h3>

        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>{t('events.loading', { fallback: 'Loading events...' })}</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={styles.retryButton}
            >
              {t('events.retry', { fallback: 'Try Again' })}
            </button>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div style={styles.eventsGrid}>
            {upcomingEvents.map((event) => (
              <div key={event._id} style={styles.eventCard}>
                <h4 style={styles.eventTitle}>
                  {event.title[language] || event.title.en || 'Untitled Event'}
                </h4>
                <p style={styles.eventDate}>
                  📅 {new Date(event.startDate).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p style={styles.eventTime}>
                  🕐 {event.startTime} - {event.endTime}
                </p>
                <p style={styles.eventLocation}>
                  📍 {event.location}
                </p>
                {event.description[language] && event.description[language] !== 'No description provided' && event.description[language] !== 'Sin descripción' && (
                  <p style={styles.eventDescription}>
                    {event.description[language] || event.description.en}
                  </p>
                )}
                <span style={styles.eventCategory}>{event.category}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noEventText}>
            {t('events.noUpcoming', { fallback: 'No upcoming events at this time. Check back soon!' })}
          </p>
        )}
      </div>
    </section>
  );
};

// 🎨 Inline styles for Google Calendar-focused layout
const styles = {
  container: {
    minHeight: '100vh',
    padding: '80px 20px 60px',
    backgroundColor: '#f4f2ec',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '15px',
    color: '#312e2b',
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '40px',
    color: '#666',
    textAlign: 'center',
    maxWidth: '700px',
  },
  googleCalendarSection: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 60px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  upcomingSection: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#312e2b',
    fontWeight: '600',
    textAlign: 'center',
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
    marginTop: '20px',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e8e8e8',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  eventTitle: {
    fontSize: '1.5rem',
    marginBottom: '16px',
    color: '#312e2b',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  eventDate: {
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: '1rem',
    marginBottom: '8px',
    color: '#555',
  },
  eventLocation: {
    fontSize: '1rem',
    marginBottom: '12px',
    color: '#555',
  },
  eventDescription: {
    fontSize: '0.95rem',
    marginTop: '12px',
    marginBottom: '12px',
    color: '#666',
    lineHeight: '1.6',
  },
  eventCategory: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#f0c987',
    color: '#312e2b',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginTop: '10px',
  },
  noEventText: {
    fontSize: '1.1rem',
    color: '#999',
    textAlign: 'center',
    padding: '40px 20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #f0c987',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  errorText: {
    fontSize: '1.1rem',
    color: '#e74c3c',
    marginBottom: '20px',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#f0c987',
    color: '#312e2b',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  },
};

export default Events;
