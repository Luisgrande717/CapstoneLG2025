/**
 * Events Carousel Component
 *
 * Displays upcoming parish events in a scrollable carousel format
 * Now fetches real events from the database and shows current week's events
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Events carousel with current week's parish events
 */

import { useState, useEffect } from 'react';
import './EventsCarousel.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import API_URL from '../config/api';

const EventsCarousel = () => {
  const { t, language } = useLanguage();
  const [weekEvents, setWeekEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentWeekEvents();
  }, []);

  // Fetch events for the current week
  const fetchCurrentWeekEvents = async () => {
    try {
      setIsLoading(true);

      // Get current date and calculate week boundaries
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
      endOfWeek.setHours(23, 59, 59, 999);

      // Fetch all events from the API
      const response = await axios.get(`${API_URL}/api/events`);
      const allEvents = response.data.data.events || [];

      // Filter events that fall within the current week
      const currentWeekEvents = allEvents.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);

        // Include event if it overlaps with the current week
        return (eventStart <= endOfWeek && eventEnd >= startOfWeek);
      });

      // Sort by start date and take up to 3 events
      const sortedEvents = currentWeekEvents
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 3);

      setWeekEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching week events:', error);
      setWeekEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date range for display
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', options);
    }

    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', options);
    return startStr + ' - ' + endStr;
  };

  if (isLoading) {
    return (
      <section className="carousel-section">
        <h2 className="carousel-title">
          {t('upcomingEventsTitle', { fallback: 'This Week Events' })}
        </h2>
        <div className="carousel-container">
          <div className="loading-message">
            {t('events.loading', { fallback: 'Loading events...' })}
          </div>
        </div>
      </section>
    );
  }

  if (weekEvents.length === 0) {
    return (
      <section className="carousel-section">
        <h2 className="carousel-title">
          {t('upcomingEventsTitle', { fallback: 'This Week Events' })}
        </h2>
        <div className="carousel-container">
          <div className="no-events-message">
            <p>{t('events.noWeekEvents', { fallback: 'No events scheduled for this week.' })}</p>
            <Link to="/events" className="view-calendar-link">
              {t('events.viewCalendar', { fallback: 'View Full Calendar' })}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">
        {t('upcomingEventsTitle', { fallback: 'This Week Events' })}
      </h2>
      <div className="carousel-container">
        {weekEvents.map((event) => (
          <Link
            to="/events"
            className="event-link"
            key={event._id}
            aria-label={event.title[language] || event.title.en}
          >
            <div className="event-card">
              <h3>{event.title[language] || event.title.en}</h3>
              <p>
                <strong>{formatDateRange(event.startDate, event.endDate)}</strong> &bull;{' '}
                {event.startTime}
              </p>
              <p className="event-description">
                {event.description[language] || event.description.en}
              </p>
              <span className="event-category">{event.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EventsCarousel;
