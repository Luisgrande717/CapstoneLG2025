// backend/models/Event.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  category: String,       // examples "Youth", "Liturgy", "Service"
  image: String,          // URL to event image or banner
  rsvpLink: String        // link to RSVP form or calendar
});

const Event = mongoose.model('Event', EventSchema);

export default Event;