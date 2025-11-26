/**
 * API Configuration
 *
 * Centralized API URL configuration for all HTTP requests
 * Uses environment variables with fallback to localhost for development
 *
 * @author Parish Development Team
 * @version 1.0.0
 */

// API base URL - uses Railway environment variable in production
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    verify: '/api/auth/verify',
  },

  // Events
  events: '/api/events',

  // Readings
  readings: '/api/readings',

  // Announcements
  announcements: '/api/announcements',

  // Bulletins
  bulletins: '/api/bulletins',

  // Subscriptions
  subscriptions: '/api/subscriptions',

  // Google Calendar
  googleCalendar: '/api/google-calendar',

  // Health check
  health: '/health',
};

/**
 * Get full API URL for an endpoint
 * @param {string} endpoint - The endpoint path
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};

export default API_URL;
