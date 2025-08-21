/**
 * Language Context for Bilingual Parish Website
 *
 * Provides language switching functionality between English and Spanish
 * with persistent storage and automatic browser language detection
 *
 * Features:
 * - Automatic browser language detection
 * - localStorage persistence
 * - Type-safe translation function
 * - Error handling for missing translations
 *
 * @author Parish Development Team
 * @version 2.0.0
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEY } from '../constants/language';
import { getStoredLanguage } from '../utils/language';

/**
 * Language Context type definition
 * @typedef {Object} LanguageContextType
 * @property {string} language - Current language code
 * @property {Function} toggleLanguage - Function to toggle between languages
 * @property {Function} setLanguage - Function to set specific language
 * @property {Function} t - Translation function
 * @property {boolean} isLoading - Loading state for translations
 */

const LanguageContext = createContext(null);

/**
 * Language Provider Component
 * Manages language state and provides translation functionality
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getStoredLanguage);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Updates language and persists to localStorage
   * @param {string} newLanguage - Language code to set
   */
  const setLanguage = useCallback(newLanguage => {
    if (!SUPPORTED_LANGUAGES.includes(newLanguage)) {
      console.error(`Unsupported language: ${newLanguage}`);
      return;
    }

    setIsLoading(true);

    // Simulate async loading for better UX
    setTimeout(() => {
      setLanguageState(newLanguage);

      try {
        localStorage.setItem(STORAGE_KEY, newLanguage);
      } catch (error) {
        console.warn('Failed to save language preference:', error);
      }

      setIsLoading(false);
    }, 100);
  }, []);

  /**
   * Toggles between available languages
   */
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  /**
   * Translation function with fallback handling
   * @param {string} key - Translation key
   * @param {Object} options - Translation options
   * @param {string} options.fallback - Fallback text if translation missing
   * @param {Object} options.variables - Variables for string interpolation
   * @returns {string} Translated text
   */
  const t = useCallback(
    (key, options = {}) => {
      const { fallback, variables } = options;

      try {
        let translation = translations[language]?.[key] || fallback || key;

        // Simple variable interpolation
        if (variables && typeof translation === 'string') {
          Object.entries(variables).forEach(([varKey, value]) => {
            translation = translation.replace(`{{${varKey}}}`, value);
          });
        }

        return translation;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return fallback || key;
      }
    },
    [language]
  );

  // Update document language attribute for accessibility
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const contextValue = {
    language,
    toggleLanguage,
    setLanguage,
    t,
    isLoading,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

/**
 * Custom hook to access language context
 * @returns {LanguageContextType} Language context value
 * @throws {Error} If used outside of LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

// Export constants for use in other components
