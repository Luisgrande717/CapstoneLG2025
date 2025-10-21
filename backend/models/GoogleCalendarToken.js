/**
 * Google Calendar Token Model
 *
 * Stores OAuth2 tokens for Google Calendar integration
 *
 * @author Parish Development Team
 * @version 1.0.0
 */

import mongoose from 'mongoose';

const googleCalendarTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One token set per user
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  tokenType: {
    type: String,
    default: 'Bearer'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  scope: {
    type: String
  },
  lastSync: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
googleCalendarTokenSchema.index({ userId: 1 });
googleCalendarTokenSchema.index({ expiryDate: 1 });

// Method to check if token is expired
googleCalendarTokenSchema.methods.isExpired = function() {
  return new Date() >= this.expiryDate;
};

// Method to update last sync time
googleCalendarTokenSchema.methods.updateLastSync = async function() {
  this.lastSync = new Date();
  return await this.save();
};

const GoogleCalendarToken = mongoose.model('GoogleCalendarToken', googleCalendarTokenSchema);

export default GoogleCalendarToken;
