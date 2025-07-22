// backend/models/Event.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['Youth', 'Liturgy', 'Service', 'Feast Day', 'Community'],
    default: 'Community'
  },
  image: {
    type: String,
    trim: true
  },
  rsvpLink: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    enum: ['English', 'Spanish'],
    default: 'English'
  },
  location: {
    type: String,
    default: 'Our Lady of Fatima Parish'
  },
  published: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String, // could eventually reference an admin user ID
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;