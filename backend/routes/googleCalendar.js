import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import googleCalendarService from '../services/googleCalendar.js';
import Event from '../models/Event.js';

const router = express.Router();

// Get Google Calendar authorization URL
router.get('/auth-url', authenticate, requireAdmin, async (req, res) => {
  try {
    const authUrl = googleCalendarService.getAuthUrl();
    res.json({ success: true, data: { url: authUrl } });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate authorization URL' 
    });
  }
});

// Handle Google Calendar OAuth callback
router.get('/oauth2callback', authenticate, requireAdmin, async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await googleCalendarService.getTokens(code);
    
    // Store tokens securely in your database associated with the user
    // You'll need to implement this based on your user model
    
    res.json({ 
      success: true, 
      message: 'Successfully connected to Google Calendar' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to complete OAuth process' 
    });
  }
});

// Import events from Google Calendar
router.post('/import', authenticate, requireAdmin, async (req, res) => {
  try {
    // You'll need to implement token retrieval from your database
    const userTokens = {}; // Get tokens for the current user
    googleCalendarService.setCredentials(userTokens);

    const events = await googleCalendarService.listEvents();
    
    // Save events to your database
    const savedEvents = await Promise.all(
      events.map(async (event) => {
        const newEvent = new Event({
          ...event,
          createdBy: req.user._id,
          published: true
        });
        return newEvent.save();
      })
    );

    res.json({ 
      success: true, 
      data: { events: savedEvents },
      message: `Successfully imported ${savedEvents.length} events`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to import events from Google Calendar' 
    });
  }
});

// Export events to Google Calendar
router.post('/export/:eventId', authenticate, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        error: 'Event not found' 
      });
    }

    // You'll need to implement token retrieval from your database
    const userTokens = {}; // Get tokens for the current user
    googleCalendarService.setCredentials(userTokens);

    const googleEvent = await googleCalendarService.addEvent(event);

    // Update the event with Google Calendar ID
    event.googleCalendarEventId = googleEvent.id;
    await event.save();

    res.json({ 
      success: true, 
      data: { event: googleEvent },
      message: 'Successfully exported event to Google Calendar'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to export event to Google Calendar' 
    });
  }
});

export default router;