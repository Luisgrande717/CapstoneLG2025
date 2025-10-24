/**
 * Admin Dashboard Component
 * 
 * Main dashboard for parish administrators with event management,
 * statistics overview, and quick access to admin functions
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import EventManager from '../components/EventManager';
import AnnouncementManager from '../components/AnnouncementManager';
import SubscriberManager from '../components/SubscriberManager';
import './AdminDashboard.css';
import 'react-calendar/dist/Calendar.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalEvents: 0,
    publishedEvents: 0,
    upcomingEvents: 0,
    draftEvents: 0,
    eventsByCategory: [],
    recentEvents: 0
  });
  const [subscriptionStats, setSubscriptionStats] = useState({
    totalSubscriptions: 0,
    bySource: {},
    byLanguage: {}
  });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(null);

  const { user, logout, token } = useAuth();
  const { t } = useLanguage();

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = async () => {
    try {
      setIsLoading(true);

      // Create axios instance with auth headers
      const authAxios = axios.create({
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch all statistics in parallel
      const [eventsResponse, subscriptionsResponse, allEventsResponse] = await Promise.all([
        authAxios.get('http://localhost:8080/api/events/stats'),
        axios.get('http://localhost:8080/api/subscriptions/stats'), // Public endpoint
        authAxios.get('http://localhost:8080/api/events?limit=100') // Get all events for calendar
      ]);

      if (eventsResponse.data.success) {
        setStats(eventsResponse.data.data);
      }

      if (subscriptionsResponse.data.success) {
        setSubscriptionStats(subscriptionsResponse.data.data);
      }

      if (allEventsResponse.data.success) {
        setCalendarEvents(allEventsResponse.data.data.events || []);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Refresh stats when switching to overview tab
  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStats();
    }
  }, [activeTab]);

  // Auto-refresh interval for overview and calendar tabs
  useEffect(() => {
    // Clear existing interval
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }

    // Set up auto-refresh for tabs that need real-time data
    if (activeTab === 'overview' || activeTab === 'calendar') {
      const interval = setInterval(() => {
        fetchStats();
      }, 30000); // Refresh every 30 seconds

      setRefreshInterval(interval);
    }

    // Cleanup function
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [activeTab]);

  /**
   * Handle logout
   */
  const handleLogout = () => {
    if (confirm(t('admin.dashboard.logout.confirm', { fallback: 'Are you sure you want to logout?' }))) {
      logout();
    }
  };


  /**
   * Render navigation tabs
   */
  const renderNavigation = () => {
    const tabs = [
      { id: 'overview', label: t('admin.dashboard.tabs.overview', { fallback: 'Overview' }) },
      { id: 'events', label: t('admin.dashboard.tabs.events', { fallback: 'Events' }) },
      { id: 'calendar', label: t('admin.dashboard.tabs.calendar', { fallback: 'Calendar' }) },
      { id: 'announcements', label: t('admin.dashboard.tabs.announcements', { fallback: 'Announcements' }) },
      { id: 'subscribers', label: t('admin.dashboard.tabs.subscribers', { fallback: 'Subscribers' }) },
      { id: 'profile', label: t('admin.dashboard.tabs.profile', { fallback: 'Profile' }) }
    ];

    return (
      <nav className="admin-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    );
  };

  /**
   * Render statistics cards
   */
  const renderStatsCards = () => {
    const statCards = [
      {
        title: t('admin.dashboard.stats.total', { fallback: 'Total Events' }),
        value: stats.totalEvents,
        color: 'blue',
        icon: '📅'
      },
      {
        title: t('admin.dashboard.stats.published', { fallback: 'Published' }),
        value: stats.publishedEvents,
        color: 'green',
        icon: '✅'
      },
      {
        title: t('admin.dashboard.stats.subscriptions', { fallback: 'Email Subscriptions' }),
        value: subscriptionStats.totalSubscriptions,
        color: 'teal',
        icon: '📧'
      }
    ];

    return (
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /**
   * Render overview content
   */
  const renderOverview = () => (
    <div className="overview-content">
      <div className="welcome-section">
        <div className="welcome-header">
          <div className="welcome-text">
            <h2>
              {t('admin.dashboard.welcome', {
                fallback: 'Welcome back, {{name}}!',
                name: user?.firstName || 'Admin'
              })}
            </h2>
            <p>
              {t('admin.dashboard.subtitle', {
                fallback: 'Manage parish events and content from your dashboard.'
              })}
            </p>
          </div>
          <button
            className="refresh-button"
            onClick={fetchStats}
            disabled={isLoading}
            title={t('admin.dashboard.refresh', { fallback: 'Refresh Data' })}
          >
            {isLoading ? '⏳' : '🔄'} {t('admin.dashboard.refresh', { fallback: 'Refresh' })}
          </button>
          <button
            className="refresh-button"
            onClick={async () => {
              try {
                const res = await axios.post('http://localhost:8080/api/google-calendar/sync', {},
                  { headers: { 'Authorization': 'Bearer ' + token } });
                if (res.data.success) {
                  alert('Synced ' + res.data.data.imported + ' events!');
                  fetchStats();
                }
              } catch (err) {
                alert('Failed to sync. Connect Google Calendar first.');
              }
            }}
            title="Sync Google Calendar"
          >
            📅 Sync Google Calendar
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-stats">
          <div className="loading-spinner"></div>
          <p>{t('admin.dashboard.loading', { fallback: 'Loading statistics...' })}</p>
        </div>
      ) : (
        renderStatsCards()
      )}

      <div className="quick-actions">
        <h3>{t('admin.dashboard.quickActions', { fallback: 'Quick Actions' })}</h3>
        <div className="action-buttons">
          <button
            className="action-btn primary"
            onClick={() => setActiveTab('events')}
          >
            📝 {t('admin.dashboard.actions.createEvent', { fallback: 'Create Event' })}
          </button>
          <button
            className="action-btn secondary"
            onClick={() => setActiveTab('events')}
          >
            📋 {t('admin.dashboard.actions.manageEvents', { fallback: 'Manage Events' })}
          </button>
          <button
            className="action-btn secondary"
            onClick={() => setActiveTab('calendar')}
          >
            📅 {t('admin.dashboard.actions.viewCalendar', { fallback: 'View Calendar' })}
          </button>
        </div>
      </div>
    </div>
  );

  /**
   * Render profile management
   */
  const renderProfile = () => (
    <div className="profile-content">
      <h2>{t('admin.dashboard.profile.title', { fallback: 'Profile Settings' })}</h2>
      <div className="profile-info">
        <div className="profile-field">
          <label>{t('admin.dashboard.profile.name', { fallback: 'Full Name' })}</label>
          <p>{user?.fullName}</p>
        </div>
        <div className="profile-field">
          <label>{t('admin.dashboard.profile.email', { fallback: 'Email' })}</label>
          <p>{user?.email}</p>
        </div>
        <div className="profile-field">
          <label>{t('admin.dashboard.profile.role', { fallback: 'Role' })}</label>
          <p className={`role-badge ${user?.role}`}>{user?.role}</p>
        </div>
        <div className="profile-field">
          <label>{t('admin.dashboard.profile.lastLogin', { fallback: 'Last Login' })}</label>
          <p>{user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="btn secondary">
          {t('admin.dashboard.profile.editProfile', { fallback: 'Edit Profile' })}
        </button>
        <button className="btn secondary">
          {t('admin.dashboard.profile.changePassword', { fallback: 'Change Password' })}
        </button>
      </div>
    </div>
  );


  /**
   * Check if a date has events
   */
  const hasEvent = (date) => {
    return calendarEvents.some(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  /**
   * Get events for a specific date
   */
  const getEventsForDate = (date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  /**
   * Render calendar with events
   */
  const renderCalendar = () => {
    const selectedDateEvents = getEventsForDate(calendarDate);

    return (
      <div className="calendar-content">
        <div className="calendar-header">
          <h2>{t('admin.dashboard.calendar.title', { fallback: 'Event Calendar' })}</h2>
          <button
            className="refresh-button"
            onClick={fetchStats}
            disabled={isLoading}
            title={t('admin.dashboard.refresh', { fallback: 'Refresh Data' })}
          >
            {isLoading ? '⏳' : '🔄'} {t('admin.dashboard.refresh', { fallback: 'Refresh' })}
          </button>
        </div>

        <div className="calendar-section">
          <div className="calendar-wrapper">
            <Calendar
              value={calendarDate}
              onChange={setCalendarDate}
              tileClassName={({ date, view }) => {
                if (view === 'month' && hasEvent(date)) {
                  return 'has-event';
                }
                return null;
              }}
              locale={t('calendarLocale', { fallback: 'en-US' })}
            />
          </div>

          <div className="calendar-sidebar">
            <div className="selected-date">
              <h3>{t('admin.dashboard.calendar.selectedDate', { fallback: 'Selected Date' })}</h3>
              <p className="date-display">
                {calendarDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="events-for-date">
              <h4>{t('admin.dashboard.calendar.eventsOnDate', { fallback: 'Events on This Date' })}</h4>
              {selectedDateEvents.length > 0 ? (
                <div className="event-list">
                  {selectedDateEvents.map(event => (
                    <div key={event._id} className="calendar-event-item">
                      <div className="event-title">
                        {typeof event.title === 'object' ? event.title.en : event.title}
                      </div>
                      <div className="event-time">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="event-location">📍 {event.location}</div>
                      <div className={`event-status ${event.published ? 'published' : 'draft'}`}>
                        {event.published ?
                          t('admin.dashboard.calendar.published', { fallback: 'Published' }) :
                          t('admin.dashboard.calendar.draft', { fallback: 'Draft' })
                        }
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">
                  {t('admin.dashboard.calendar.noEvents', { fallback: 'No events scheduled for this date.' })}
                </p>
              )}
            </div>

            <div className="calendar-stats">
              <h4>{t('admin.dashboard.calendar.quickStats', { fallback: 'Quick Stats' })}</h4>
              <div className="mini-stats">
                <div className="mini-stat">
                  <span className="mini-stat-number">{calendarEvents.length}</span>
                  <span className="mini-stat-label">{t('admin.dashboard.stats.total', { fallback: 'Total Events' })}</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-number">
                    {calendarEvents.filter(e => e.published).length}
                  </span>
                  <span className="mini-stat-label">{t('admin.dashboard.stats.published', { fallback: 'Published' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render main content based on active tab
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'events':
        return <EventManager />;
      case 'calendar':
        return renderCalendar();
      case 'announcements':
        return <AnnouncementManager />;
      case 'subscribers':
        return <SubscriberManager />;
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <img
            src="/assets/church-logo2.png"
            alt={t('logoAlt', { fallback: 'Parish Logo' })}
            className="header-logo"
          />
          <h1>{t('admin.dashboard.title', { fallback: 'Parish Admin' })}</h1>
        </div>
        <div className="header-right">
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            className="logout-btn"
            onClick={handleLogout}
            title={t('admin.dashboard.logout.title', { fallback: 'Logout' })}
          >
            {t('admin.dashboard.logout.button', { fallback: 'Logout' })}
          </button>
        </div>
      </header>

      <div className="admin-content">
        <aside className="admin-sidebar">
          {renderNavigation()}
        </aside>

        <main className="admin-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
