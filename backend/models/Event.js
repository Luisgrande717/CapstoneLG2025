/**
 * Event Model for Parish Event Management
 * 
 * Enhanced model supporting bilingual content, advanced scheduling,
 * and admin management for Our Lady of Fatima Parish website
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    en: {
      type: String,
      required: [true, 'English title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    es: {
      type: String,
      required: [true, 'Spanish title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    }
  },
  description: {
    en: {
      type: String,
      required: [true, 'English description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    es: {
      type: String,
      required: [true, 'Spanish description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    index: true
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value >= this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter time in HH:MM format']
  },
  category: {
    type: String,
    enum: ['Youth', 'Liturgy', 'Service', 'Feast Day', 'Community', 'Mass', 'Prayer', 'Education', 'Fundraising'],
    required: [true, 'Event category is required'],
    index: true
  },
  image: {
    type: String,
    trim: true
  },
  rsvpLink: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    default: 'Our Lady of Fatima Parish',
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    type: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: function() { return this.isRecurring; }
    },
    interval: {
      type: Number,
      min: 1,
      max: 12,
      default: 1
    },
    daysOfWeek: [{
      type: Number,
      min: 0,
      max: 6
    }],
    endRecurrence: {
      type: Date,
      required: function() { return this.isRecurring; }
    }
  },
  published: {
    type: Boolean,
    default: false,
    index: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  maxAttendees: {
    type: Number,
    min: 1,
    default: null
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  contactInfo: {
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
    },
    person: {
      type: String,
      trim: true,
      maxlength: [100, 'Contact person name cannot exceed 100 characters']
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Google Calendar integration fields
  googleCalendarEventId: {
    type: String,
    sparse: true,
    index: true
  },
  googleCalendarId: {
    type: String,
    default: 'primary'
  },
  lastSyncedWithGoogle: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient queries
EventSchema.index({ startDate: 1, published: 1 });
EventSchema.index({ category: 1, startDate: 1 });
EventSchema.index({ tags: 1 });

// Virtual for duration in minutes
EventSchema.virtual('durationMinutes').get(function() {
  if (!this.startTime || !this.endTime) return null;
  const start = new Date(`1970-01-01T${this.startTime}:00`);
  const end = new Date(`1970-01-01T${this.endTime}:00`);
  return Math.round((end - start) / (1000 * 60));
});

// Virtual for date range display
EventSchema.virtual('dateRange').get(function() {
  const start = this.startDate.toISOString().split('T')[0];
  const end = this.endDate.toISOString().split('T')[0];
  return start === end ? start : `${start} - ${end}`;
});

// Instance methods
EventSchema.methods.isUpcoming = function() {
  return this.startDate > new Date();
};

EventSchema.methods.isActive = function() {
  const now = new Date();
  return this.startDate <= now && this.endDate >= now;
};

// Static methods for querying
EventSchema.statics.findUpcoming = function(limit = 10) {
  return this.find({
    startDate: { $gte: new Date() },
    published: true
  })
  .sort({ startDate: 1 })
  .limit(limit)
  .populate('createdBy', 'firstName lastName')
  .populate('lastModifiedBy', 'firstName lastName');
};

EventSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    $or: [
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
    ],
    published: true
  }).sort({ startDate: 1 });
};

// Pre-save middleware
EventSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew && !this.lastModifiedBy) {
    this.lastModifiedBy = this.createdBy;
  }
  next();
});

const Event = mongoose.model('Event', EventSchema);

export default Event;