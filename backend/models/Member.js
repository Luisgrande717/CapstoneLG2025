/**
 * Member Model for Parish Community
 * 
 * Handles parish member accounts with secure authentication
 * and community engagement features
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'USA' }
  },
  dateOfBirth: {
    type: Date
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'es'],
    default: 'en'
  },
  ministries: [{
    type: String,
    enum: ['choir', 'youth', 'liturgy', 'outreach', 'education', 'maintenance']
  }],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  emailSubscriptions: {
    newsletter: { type: Boolean, default: true },
    events: { type: Boolean, default: true },
    announcements: { type: Boolean, default: true },
    prayers: { type: Boolean, default: false }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
memberSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for full address
memberSchema.virtual('fullAddress').get(function() {
  if (!this.address || !this.address.street) return '';
  
  const { street, city, state, zipCode } = this.address;
  return `${street}, ${city}, ${state} ${zipCode}`.trim();
});

// Index for faster queries
memberSchema.index({ email: 1 });
memberSchema.index({ membershipStatus: 1 });
memberSchema.index({ isActive: 1 });
memberSchema.index({ preferredLanguage: 1 });

// Pre-save middleware to hash password
memberSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
memberSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to update last login
memberSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  return await this.save();
};

// Instance method to generate email verification token
memberSchema.methods.generateEmailVerificationToken = function() {
  const token = Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
  this.emailVerificationToken = token;
  return token;
};

// Static method to find active members
memberSchema.statics.findActiveMembers = function() {
  return this.find({ membershipStatus: 'active', isActive: true });
};

// Static method to find by email
memberSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase(), isActive: true }).select('+password');
};

// Static method to get membership statistics
memberSchema.statics.getMembershipStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$membershipStatus',
        count: { $sum: 1 }
      }
    }
  ]);
};

const Member = mongoose.model('Member', memberSchema);

export default Member;