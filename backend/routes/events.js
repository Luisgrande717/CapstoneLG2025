// backend/routes/events.js
import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

//  POST: Create new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('[Event Creation Error]', err.message);
    res.status(400).json({ error: 'Failed to create event' });
  }
});

export default router;