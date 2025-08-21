/**
 * Language Utility Functions
 *
 * Helper functions for language detection and management
 *
 * @version 2.0.0
 */

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEY } from '../constants/language';

/**
 * Detects user's preferred language from browser settings
 * @returns {string} Detected language code or default
 */
export const detectBrowserLanguage = () => {
  try {
    const browserLang = navigator.language?.split('-')[0];
    return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

/**
 * Gets stored language from localStorage with fallback
 * @returns {string} Stored language or browser-detected language
 */
export const getStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
  }
  return detectBrowserLanguage();
};
