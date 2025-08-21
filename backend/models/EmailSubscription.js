/**
 * Email Subscription Model
 * 
 * Handles email newsletter subscriptions for parish communications
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import mongoose from 'mongoose';

const emailSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subscriptionTypes: {
    newsletter: { type: Boolean, default: true },
    events: { type: Boolean, default: true },
    announcements: { type: Boolean, default: true },
    prayers: { type: Boolean, default: false }
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'es'],
    default: 'en'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    enum: ['footer', 'member_registration', 'direct'],
    default: 'footer'
  },
  unsubscribeToken: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Index for faster queries
emailSubscriptionSchema.index({ email: 1 });
emailSubscriptionSchema.index({ isActive: 1 });
emailSubscriptionSchema.index({ preferredLanguage: 1 });

// Generate unsubscribe token before saving
emailSubscriptionSchema.pre('save', function(next) {
  if (this.isNew) {
    this.unsubscribeToken = Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
  }
  next();
});

// Static method to get subscription statistics
emailSubscriptionSchema.statics.getSubscriptionStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$source',
        count: { $sum: 1 }
      }
    }
  ]);
};

const EmailSubscription = mongoose.model('EmailSubscription', emailSubscriptionSchema);

export default EmailSubscription;