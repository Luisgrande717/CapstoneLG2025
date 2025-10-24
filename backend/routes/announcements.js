/**
 * Announcement Routes
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import Announcement from '../models/Announcement.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/announcements');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'announcement-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and documents
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (jpg, png, gif) and documents (pdf, doc, docx) are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// GET active announcement
router.get('/active', async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ isActive: true })
      .sort({ priority: -1, createdAt: -1 });
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET all announcements (admin)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create announcement with file upload (admin)
router.post('/', authenticate, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'File is required' });
    }

    // Determine file type from extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    let fileType;
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      fileType = 'image';
    } else if (ext === '.pdf') {
      fileType = 'pdf';
    } else if (['.doc', '.docx'].includes(ext)) {
      fileType = ext === '.doc' ? 'doc' : 'docx';
    } else {
      // Delete uploaded file if type not supported
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'Unsupported file type' });
    }

    // Parse bilingual fields from form data
    const announcementData = {
      title: {
        en: req.body.titleEn,
        es: req.body.titleEs
      },
      description: {
        en: req.body.descriptionEn || '',
        es: req.body.descriptionEs || ''
      },
      fileUrl: `/uploads/announcements/${req.file.filename}`,
      fileType: fileType,
      fileName: req.file.originalname,
      priority: parseInt(req.body.priority) || 0,
      createdBy: req.user._id
    };

    const announcement = new Announcement(announcementData);
    await announcement.save();
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    // Delete uploaded file if database save fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH toggle active status
router.patch('/:id/toggle', authenticate, requireAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ success: false, message: 'Not found' });
    if (!announcement.isActive) {
      await Announcement.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }
    announcement.isActive = !announcement.isActive;
    await announcement.save();
    res.json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE announcement
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', announcement.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
