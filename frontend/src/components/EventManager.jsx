/**
 * Event Manager Component
 * 
 * Comprehensive event management interface with CRUD operations,
 * bilingual support, and calendar integration for parish admins
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import './EventManager.css';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    title: { en: '', es: '' },
    description: { en: '', es: '' },
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    category: 'Community',
    location: 'Our Lady of Fatima Parish',
    published: false,
    featured: false,
    isRecurring: false,
    maxAttendees: '',
    registrationRequired: false,
    contactInfo: {
      email: '',
      phone: '',
      person: ''
    },
    tags: [],
    priority: 'medium'
  });

  const categories = [
    'Youth', 'Liturgy', 'Service', 'Feast Day', 'Community', 
    'Mass', 'Prayer', 'Education', 'Fundraising'
  ];

  /**
   * Fetch events from API
   */
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/events');
      setEvents(response.data.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  /**
   * Handle bilingual input changes
   */
  const handleBilingualChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  /**
   * Reset form data
   */
  const resetForm = () => {
    setFormData({
      title: { en: '', es: '' },
      description: { en: '', es: '' },
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      category: 'Community',
      location: 'Our Lady of Fatima Parish',
      published: false,
      featured: false,
      isRecurring: false,
      maxAttendees: '',
      registrationRequired: false,
      contactInfo: {
        email: '',
        phone: '',
        person: ''
      },
      tags: [],
      priority: 'medium'
    });
    setEditingEvent(null);
    setShowCreateForm(false);
  };

  /**
   * Handle create/update event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null
      };

      if (editingEvent) {
        // Update existing event
        const response = await axios.put(`/api/events/${editingEvent._id}`, submitData);
        setEvents(prev => prev.map(event => 
          event._id === editingEvent._id ? response.data.data.event : event
        ));
      } else {
        // Create new event
        const response = await axios.post('/api/events', submitData);
        setEvents(prev => [response.data.data.event, ...prev]);
      }

      resetForm();
      alert(t('admin.events.saved', { fallback: 'Event saved successfully!' }));
    } catch (error) {
      console.error('Error saving event:', error);
      alert(t('admin.events.error', { fallback: 'Error saving event. Please try again.' }));
    }
  };

  /**
   * Handle edit event
   */
  const handleEdit = (event) => {
    setFormData({
      title: event.title || { en: '', es: '' },
      description: event.description || { en: '', es: '' },
      startDate: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '',
      endDate: event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : '',
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      category: event.category || 'Community',
      location: event.location || 'Our Lady of Fatima Parish',
      published: event.published || false,
      featured: event.featured || false,
      isRecurring: event.isRecurring || false,
      maxAttendees: event.maxAttendees || '',
      registrationRequired: event.registrationRequired || false,
      contactInfo: event.contactInfo || { email: '', phone: '', person: '' },
      tags: event.tags || [],
      priority: event.priority || 'medium'
    });
    setEditingEvent(event);
    setShowCreateForm(true);
  };

  /**
   * Handle delete event
   */
  const handleDelete = async (eventId) => {
    if (!confirm(t('admin.events.deleteConfirm', { fallback: 'Are you sure you want to delete this event?' }))) {
      return;
    }

    try {
      await axios.delete(`/api/events/${eventId}`);
      setEvents(prev => prev.filter(event => event._id !== eventId));
      alert(t('admin.events.deleted', { fallback: 'Event deleted successfully!' }));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(t('admin.events.deleteError', { fallback: 'Error deleting event. Please try again.' }));
    }
  };

  /**
   * Toggle event published status
   */
  const togglePublished = async (event) => {
    try {
      const response = await axios.put(`/api/events/${event._id}/publish`, {
        published: !event.published
      });
      
      setEvents(prev => prev.map(e => 
        e._id === event._id ? response.data.data.event : e
      ));
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  /**
   * Filter events based on criteria
   */
  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || 
      (filter === 'published' && event.published) ||
      (filter === 'draft' && !event.published) ||
      (filter === 'upcoming' && new Date(event.startDate) > new Date());
    
    const matchesSearch = !searchTerm || 
      event.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title?.es?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /**
   * Render event form
   */
  const renderEventForm = () => (
    <div className="event-form-overlay">
      <div className="event-form-container">
        <div className="form-header">
          <h3>
            {editingEvent 
              ? t('admin.events.editEvent', { fallback: 'Edit Event' })
              : t('admin.events.createEvent', { fallback: 'Create New Event' })
            }
          </h3>
          <button type="button" className="close-btn" onClick={resetForm}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          {/* Bilingual Title */}
          <div className="form-group">
            <label>{t('admin.events.form.title', { fallback: 'Title' })}</label>
            <div className="bilingual-input">
              <input
                type="text"
                placeholder="English title"
                value={formData.title.en}
                onChange={(e) => handleBilingualChange('title', 'en', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Spanish title"
                value={formData.title.es}
                onChange={(e) => handleBilingualChange('title', 'es', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Bilingual Description */}
          <div className="form-group">
            <label>{t('admin.events.form.description', { fallback: 'Description' })}</label>
            <div className="bilingual-input">
              <textarea
                placeholder="English description"
                value={formData.description.en}
                onChange={(e) => handleBilingualChange('description', 'en', e.target.value)}
                rows="3"
                required
              />
              <textarea
                placeholder="Spanish description"
                value={formData.description.es}
                onChange={(e) => handleBilingualChange('description', 'es', e.target.value)}
                rows="3"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="form-row">
            <div className="form-group">
              <label>{t('admin.events.form.startDate', { fallback: 'Start Date' })}</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('admin.events.form.endDate', { fallback: 'End Date' })}</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('admin.events.form.startTime', { fallback: 'Start Time' })}</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('admin.events.form.endTime', { fallback: 'End Time' })}</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Category and Location */}
          <div className="form-row">
            <div className="form-group">
              <label>{t('admin.events.form.category', { fallback: 'Category' })}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('admin.events.form.location', { fallback: 'Location' })}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <label>{t('admin.events.form.contact', { fallback: 'Contact Information' })}</label>
            <div className="contact-inputs">
              <input
                type="email"
                name="contactInfo.email"
                placeholder="Email"
                value={formData.contactInfo.email}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="contactInfo.phone"
                placeholder="Phone"
                value={formData.contactInfo.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="contactInfo.person"
                placeholder="Contact person"
                value={formData.contactInfo.person}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Options */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
              />
              {t('admin.events.form.published', { fallback: 'Published' })}
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              {t('admin.events.form.featured', { fallback: 'Featured' })}
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="registrationRequired"
                checked={formData.registrationRequired}
                onChange={handleInputChange}
              />
              {t('admin.events.form.registration', { fallback: 'Registration Required' })}
            </label>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={resetForm}>
              {t('admin.events.form.cancel', { fallback: 'Cancel' })}
            </button>
            <button type="submit" className="btn-save">
              {editingEvent 
                ? t('admin.events.form.update', { fallback: 'Update Event' })
                : t('admin.events.form.create', { fallback: 'Create Event' })
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('admin.events.loading', { fallback: 'Loading events...' })}</p>
      </div>
    );
  }

  return (
    <div className="event-manager">
      <div className="manager-header">
        <h2>{t('admin.events.title', { fallback: 'Event Management' })}</h2>
        <button 
          className="btn-create"
          onClick={() => setShowCreateForm(true)}
        >
          + {t('admin.events.createNew', { fallback: 'Create Event' })}
        </button>
      </div>

      <div className="manager-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder={t('admin.events.search', { fallback: 'Search events...' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {['all', 'published', 'draft', 'upcoming'].map(filterType => (
            <button
              key={filterType}
              className={`filter-tab ${filter === filterType ? 'active' : ''}`}
              onClick={() => setFilter(filterType)}
            >
              {t(`admin.events.filters.${filterType}`, { fallback: filterType })}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event._id} className="event-card">
            <div className="event-header">
              <h3>{event.title?.[language] || event.title?.en || 'Untitled'}</h3>
              <div className="event-status">
                {event.published ? (
                  <span className="status published">Published</span>
                ) : (
                  <span className="status draft">Draft</span>
                )}
                {event.featured && <span className="status featured">Featured</span>}
              </div>
            </div>
            
            <div className="event-details">
              <p className="event-date">
                📅 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
              <p className="event-time">
                🕒 {event.startTime} - {event.endTime}
              </p>
              <p className="event-category">
                🏷️ {event.category}
              </p>
              <p className="event-location">
                📍 {event.location}
              </p>
            </div>

            <div className="event-actions">
              <button 
                className="btn-edit"
                onClick={() => handleEdit(event)}
              >
                Edit
              </button>
              <button 
                className={`btn-toggle ${event.published ? 'unpublish' : 'publish'}`}
                onClick={() => togglePublished(event)}
              >
                {event.published ? 'Unpublish' : 'Publish'}
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-events">
          <p>{t('admin.events.noEvents', { fallback: 'No events found.' })}</p>
        </div>
      )}

      {showCreateForm && renderEventForm()}
    </div>
  );
};

export default EventManager;