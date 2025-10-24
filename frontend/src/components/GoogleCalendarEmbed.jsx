/**
 * Google Calendar Embed Component
 *
 * Displays the parish Google Calendar directly on the website
 * Responsive design that adapts to different screen sizes
 *
 * NOTE: Calendar must be set to "public" in Google Calendar settings
 * for the embed to work without authentication issues
 */

import { useState } from 'react';
import './GoogleCalendarEmbed.css';

const GoogleCalendarEmbed = ({ calendarId = 'olfperthamboy@gmail.com', timezone = 'America/New_York' }) => {
  const [view, setView] = useState('month'); // month, week, agenda
  const [showFallback, setShowFallback] = useState(false);

  // Construct the Google Calendar embed URL with current view
  const getCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/embed';
    const params = new URLSearchParams({
      src: calendarId,
      ctz: timezone,
      mode: view === 'month' ? 'MONTH' : view === 'week' ? 'WEEK' : 'AGENDA',
      showTitle: '0',
      showNav: '1',
      showDate: '1',
      showPrint: '0',
      showTabs: '1',
      showCalendars: '0',
      showTz: '0',
      wkst: '1', // Week starts on Sunday
      bgcolor: '#ffffff',
      // Add parameters to improve mobile compatibility
      hl: 'en', // Language
      showCalendars: '0',
      showTz: '0'
    });

    return `${baseUrl}?${params.toString()}`;
  };

  // Direct link to view calendar in Google Calendar app or browser
  const getDirectCalendarLink = () => {
    return `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`;
  };

  return (
    <div className="google-calendar-embed">
      <div className="calendar-header">
        <h2>Parish Calendar</h2>
        <div className="calendar-view-toggle">
          <button
            className={view === 'month' ? 'active' : ''}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button
            className={view === 'week' ? 'active' : ''}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className={view === 'agenda' ? 'active' : ''}
            onClick={() => setView('agenda')}
          >
            Agenda
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <iframe
          src={getCalendarUrl()}
          style={{ border: 0 }}
          className="calendar-iframe"
          frameBorder="0"
          scrolling="no"
          title="Parish Google Calendar"
        />
      </div>

      <div className="calendar-footer">
        <p className="calendar-info">
          View and subscribe to our parish calendar. Click on any event for more details.
        </p>
        <div className="calendar-actions">
          <a
            href={getDirectCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-subscribe-link primary"
          >
            Open in Google Calendar
          </a>
          <a
            href={`https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-subscribe-link secondary"
          >
            Subscribe (iCal)
          </a>
        </div>
        <p className="calendar-note">
          📱 Having trouble viewing on mobile? Try opening in the Google Calendar app using the button above.
        </p>
      </div>
    </div>
  );
};

export default GoogleCalendarEmbed;
