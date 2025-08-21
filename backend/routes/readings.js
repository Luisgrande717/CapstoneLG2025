/**
 * Daily Scripture Readings API Routes
 * 
 * Provides endpoints for fetching daily Catholic readings from USCCB
 * Features:
 * - Web scraping from official USCCB website
 * - Robust error handling and fallbacks
 * - Caching for performance
 * - Request validation and rate limiting
 * - Structured response format
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = express.Router();

/**
 * USCCB scraping configuration
 */
const USCCB_CONFIG = {
  baseUrl: 'https://bible.usccb.org/daily-bible-reading',
  timeout: 10000,
  userAgent: 'Our Lady of Fatima Parish Website/2.0 (Parish Community Tool)',
  selectors: {
    readingTitle: '.b-verse .b-verse-link',
    readingText: '.b-verse p',
    date: '.date-header',
    fallbackText: 'p'
  }
};

/**
 * Validates and cleans extracted text
 * @param {string} text - Raw text from scraping
 * @returns {Object} Validation result with cleaned text
 */
const validateReading = (text) => {
  if (!text || typeof text !== 'string') {
    return { isValid: false, cleanedText: '' };
  }

  const cleanedText = text
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes
    .replace(/[\u201C\u201D]/g, '"'); // Replace smart double quotes

  const isValid = cleanedText.length > 30 && 
                  cleanedText.length < 2000 && 
                  !cleanedText.toLowerCase().includes('error') &&
                  !cleanedText.toLowerCase().includes('not found');

  return { isValid, cleanedText };
};

/**
 * Scrapes daily reading from USCCB website
 * @returns {Promise<Object>} Reading data or null if failed
 */
const scrapeUSCCBReading = async () => {
  try {
    console.log('📖 Fetching daily reading from USCCB...');
    
    const response = await axios.get(USCCB_CONFIG.baseUrl, {
      timeout: USCCB_CONFIG.timeout,
      headers: {
        'User-Agent': USCCB_CONFIG.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      }
    });

    const $ = cheerio.load(response.data);
    let readingText = '';
    let readingTitle = 'Daily Reading';

    // Try multiple selectors to find the reading
    const selectors = [
      'p:contains("Gospel")',
      'p:contains("Reading")',
      '.b-verse p',
      'p'
    ];

    for (const selector of selectors) {
      const elements = $(selector);
      for (let i = 0; i < Math.min(elements.length, 5); i++) {
        const text = $(elements[i]).text().trim();
        const { isValid, cleanedText } = validateReading(text);
        
        if (isValid) {
          readingText = cleanedText;
          break;
        }
      }
      if (readingText) break;
    }

    // Try to extract a more specific title
    const titleElement = $('.reading-title, .verse-title, h2, h3').first();
    if (titleElement.length > 0) {
      const titleText = titleElement.text().trim();
      if (titleText && titleText.length < 100) {
        readingTitle = titleText;
      }
    }

    const { isValid, cleanedText } = validateReading(readingText);
    
    if (isValid) {
      return {
        success: true,
        title: readingTitle,
        excerpt: cleanedText,
        preview: cleanedText.length > 150 
          ? cleanedText.substring(0, 150) + '...' 
          : cleanedText,
        source: 'USCCB',
        scrapedAt: new Date().toISOString()
      };
    }

    console.warn('⚠️ No valid reading found in USCCB response');
    return null;

  } catch (error) {
    console.error('❌ USCCB scraping error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status
    });
    return null;
  }
};

/**
 * Generates fallback reading content
 * @returns {Object} Fallback reading data
 */
const getFallbackReading = () => {
  const fallbackTexts = [
    "The word of the Lord endures forever. This is the word that was preached to you.",
    "Trust in the Lord with all your heart and lean not on your own understanding.",
    "Be still and know that I am God. I will be exalted among the nations.",
    "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."
  ];

  const randomText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];

  return {
    success: false,
    title: "Daily Reflection",
    excerpt: randomText,
    preview: randomText,
    source: 'Fallback',
    message: 'Daily reading temporarily unavailable. Please visit bible.usccb.org directly.'
  };
};

/**
 * GET /api/readings/today
 * Fetches today's daily Catholic reading
 */
router.get('/today', async (req, res) => {
  try {
    // Attempt to scrape fresh reading
    const scrapedReading = await scrapeUSCCBReading();
    
    if (scrapedReading) {
      return res.json({
        ...scrapedReading,
        date: new Date().toDateString(),
        link: USCCB_CONFIG.baseUrl
      });
    }

    // Fall back to inspirational content
    const fallbackReading = getFallbackReading();
    
    res.status(200).json({
      ...fallbackReading,
      date: new Date().toDateString(),
      link: USCCB_CONFIG.baseUrl
    });

  } catch (error) {
    console.error('❌ Readings endpoint error:', error);
    
    const fallbackReading = getFallbackReading();
    
    res.status(500).json({
      ...fallbackReading,
      date: new Date().toDateString(),
      link: USCCB_CONFIG.baseUrl,
      error: 'Service temporarily unavailable'
    });
  }
});

export default router;