/**
 * Bulletin Model
 *
 * Stores weekly parish bulletin PDF files
 * Each bulletin has a PDF file, upload date, and week information
 *
 * @module models/Bulletin
 */

import mongoose from 'mongoose';

const bulletinSchema = new mongoose.Schema({
  // File information
  filename: {
    type: String,
    required: true,
    trim: true
  },

  originalName: {
    type: String,
    required: true,
    trim: true
  },

  filePath: {
    type: String,
    required: true
  },

  fileSize: {
    type: Number,
    required: true
  },

  // Bulletin metadata
  weekOf: {
    type: Date,
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true,
    default: ''
  },

  // Status
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },

  // Upload tracking
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  // View tracking
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for finding active bulletin by week
bulletinSchema.index({ weekOf: -1, isActive: 1 });

// Instance method to increment view count
bulletinSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

// Static method to get current week's bulletin
bulletinSchema.statics.getCurrentBulletin = function() {
  return this.findOne({ isActive: true })
    .sort({ weekOf: -1 })
    .populate('uploadedBy', 'name email');
};

// Static method to get bulletin by week
bulletinSchema.statics.getBulletinByWeek = function(weekDate) {
  return this.findOne({
    weekOf: weekDate,
    isActive: true
  }).populate('uploadedBy', 'name email');
};

// Static method to deactivate old bulletins when uploading new one
bulletinSchema.statics.deactivateOldBulletins = async function(weekDate) {
  return this.updateMany(
    {
      weekOf: weekDate,
      isActive: true
    },
    {
      isActive: false
    }
  );
};

const Bulletin = mongoose.model('Bulletin', bulletinSchema);

export default Bulletin;
