import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import googleCalendarService from '../services/googleCalendar.js';
import Event from '../models/Event.js';
import GoogleCalendarToken from '../models/GoogleCalendarToken.js';

const router = express.Router();

// Sync/Import events from Google Calendar
router.post('/sync', authenticate, requireAdmin, async (req, res) => {
  try {
    const tokenData = await GoogleCalendarToken.findOne({ userId: req.user._id });
    if (!tokenData) {
      return res.status(400).json({ success: false, error: 'Google Calendar not connected' });
    }
    
    googleCalendarService.setCredentials({
      access_token: tokenData.accessToken,
      refresh_token: tokenData.refreshToken,
      token_type: tokenData.tokenType,
      expiry_date: tokenData.expiryDate.getTime()
    });

    const googleEvents = await googleCalendarService.listEvents();
    const savedEvents = [];
    
    for (const eventData of googleEvents) {
      const existingEvent = await Event.findOne({ googleCalendarEventId: eventData.googleCalendarEventId });
      if (existingEvent) {
        Object.assign(existingEvent, { ...eventData, createdBy: req.user._id });
        await existingEvent.save();
        savedEvents.push(existingEvent);
      } else {
        const newEvent = new Event({ ...eventData, createdBy: req.user._id, published: true });
        await newEvent.save();
        savedEvents.push(newEvent);
      }
    }
    
    await tokenData.updateLastSync();
    res.json({ success: true, data: { events: savedEvents }, message:  });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Sync failed' });
  }
});

export default router;
