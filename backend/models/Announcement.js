/**
 * Announcement Model for Featured Flyers/Announcements
 * 
 * Supports uploading and displaying important parish announcements
 * Admin can toggle visibility on the homepage
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
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
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    es: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    }
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true
  },
  fileType: {
    type: String,
    enum: ['image', 'pdf', 'doc', 'docx'],
    required: [true, 'File type is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: false,
    index: true
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
AnnouncementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get active announcements
AnnouncementSchema.statics.getActiveAnnouncements = function() {
  return this.find({ isActive: true })
    .sort({ priority: -1, createdAt: -1 })
    .limit(1)
    .populate('createdBy', 'username email');
};

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

export default Announcement;
