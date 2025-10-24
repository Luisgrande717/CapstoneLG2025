import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import googleCalendarService from '../services/googleCalendar.js';
import Event from '../models/Event.js';
import GoogleCalendarToken from '../models/GoogleCalendarToken.js';

const router = express.Router();

router.get('/auth-url', authenticate, requireAdmin, async (req, res) => {
  try {
    const state = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET || 'fatima-secret', { expiresIn: '10m' });
    const authUrl = googleCalendarService.getAuthUrl() + `&state=${state}`;
    res.json({ success: true, data: { url: authUrl } });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ success: false, error: 'Failed to generate authorization URL' });
  }
});

router.get('/oauth2callback', async (req, res) => {
  try {
    const { code, error, state } = req.query;
    if (error || !code) {
      return res.redirect('http://localhost:5173/admin?google_auth=failed');
    }

    let userId;
    try {
      const decoded = jwt.verify(state, process.env.JWT_SECRET || 'fatima-secret');
      userId = decoded.userId;
    } catch (err) {
      return res.redirect('http://localhost:5173/admin?google_auth=failed');
    }

    const tokens = await googleCalendarService.getTokens(code);
    const expiryDate = new Date(Date.now() + 3600000);

    // Find existing token to preserve refresh token if not provided
    const existingToken = await GoogleCalendarToken.findOne({ userId });

    const updateData = {
      userId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || (existingToken ? existingToken.refreshToken : null),
      tokenType: tokens.token_type || 'Bearer',
      expiryDate,
      scope: tokens.scope
    };

    // Only proceed if we have a refresh token (either new or existing)
    if (!updateData.refreshToken) {
      console.error('No refresh token available. User needs to revoke access and re-authorize.');
      return res.redirect('http://localhost:5173/admin?google_auth=failed&reason=no_refresh_token');
    }

    await GoogleCalendarToken.findOneAndUpdate(
      { userId },
      updateData,
      { upsert: true, new: true }
    );

    console.log('Tokens stored for user:', userId);
    res.redirect('http://localhost:5173/admin?google_auth=success');
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect('http://localhost:5173/admin?google_auth=failed');
  }
});

router.post('/sync', authenticate, requireAdmin, async (req, res) => {
  try {
    const tokenData = await GoogleCalendarToken.findOne({ userId: req.user._id });
    if (!tokenData) {
      return res.status(400).json({ success: false, error: 'Not connected to Google Calendar' });
    }

    googleCalendarService.setCredentials({
      access_token: tokenData.accessToken,
      refresh_token: tokenData.refreshToken,
      token_type: tokenData.tokenType,
      expiry_date: tokenData.expiryDate.getTime()
    });

    // Use the parish calendar email as the calendar ID
    const parishCalendarId = 'olfperthamboy@gmail.com';
    console.log('Fetching events from Google Calendar:', parishCalendarId);
    const googleEvents = await googleCalendarService.listEvents(parishCalendarId);
    console.log('Found', googleEvents.length, 'events');

    const savedEvents = [];

    for (const eventData of googleEvents) {
      const existing = await Event.findOne({ googleCalendarEventId: eventData.googleCalendarEventId });
      if (existing) {
        Object.assign(existing, eventData);
        await existing.save();
        savedEvents.push(existing);
      } else {
        const newEvent = await Event.create({ ...eventData, createdBy: req.user._id, published: true });
        savedEvents.push(newEvent);
      }
    }

    await tokenData.updateLastSync();
    console.log('Sync complete:', savedEvents.length, 'events saved');

    res.json({
      success: true,
      data: { events: savedEvents, imported: savedEvents.length },
      message: 'Synced ' + savedEvents.length + ' events from Google Calendar'
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ success: false, error: 'Failed to sync events' });
  }
});

router.post('/export/:eventId', authenticate, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const tokenData = await GoogleCalendarToken.findOne({ userId: req.user._id });
    if (!tokenData) {
      return res.status(400).json({ success: false, error: 'Not connected' });
    }

    googleCalendarService.setCredentials({
      access_token: tokenData.accessToken,
      refresh_token: tokenData.refreshToken,
      token_type: tokenData.tokenType,
      expiry_date: tokenData.expiryDate.getTime()
    });

    // Export to the parish calendar
    const parishCalendarId = 'olfperthamboy@gmail.com';
    const googleEvent = await googleCalendarService.addEvent(event, parishCalendarId);
    event.googleCalendarEventId = googleEvent.id;
    event.googleCalendarId = parishCalendarId;
    await event.save();

    res.json({ success: true, message: 'Exported to parish calendar successfully' });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ success: false, error: 'Failed to export to parish calendar' });
  }
});

export default router;
