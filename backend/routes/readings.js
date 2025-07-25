// Import necessary modules using ES Module syntax
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio'; //  cheerio works great with ESM

const router = express.Router();

// Define a GET route for /api/readings/today
router.get('/today', async (req, res) => {
  try {
    //  Request the USCCB daily reading HTML page
    const { data } = await axios.get('https://bible.usccb.org/daily-bible-reading');

    //  Load HTML into Cheerio for parsing
    const $ = cheerio.load(data); //  $ gets defined here

    //  Select the correct paragraph (based on your successful test)
    const excerptParagraph = $('p').eq(2).text().trim();

    //  Confirm data is valid (not empty or fallback)
    const isValid = excerptParagraph && excerptParagraph.length > 50;

    if (isValid) {
      res.json({
        date: new Date().toDateString(),
        title: "Reading 1", // You can customize this dynamically later
        excerpt: excerptParagraph,
        preview:
          excerptParagraph.length > 120
            ? excerptParagraph.substring(0, 120) + '...'
            : excerptParagraph,
        link: "https://bible.usccb.org/daily-bible-reading"
      });
    } else {
      //   fallback if no valid paragraph is found
      res.status(200).json({
        date: new Date().toDateString(),
        title: "Today's Gospel",
        excerpt: "Reading not available. Please check back soon.",
        preview: "Coming soon...",
        link: "https://bible.usccb.org/daily-bible-reading"
      });
    }
  } catch (err) {
    console.error('[USCCB Scraper Error]', err.message);

    //  Network or parsing error fallback
    res.status(500).json({
      date: new Date().toDateString(),
      title: "Today's Gospel",
      excerpt: "Reading not available. Please check back soon.",
      preview: "Coming soon...",
      link: "https://bible.usccb.org/daily-bible-reading"
    });
  }
});

//  Export router properly (to resolve your ES Module import issue)
export default router;