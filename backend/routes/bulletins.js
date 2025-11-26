/**
 * Bulletin Routes
 *
 * API endpoints for managing weekly parish bulletins
 * Includes upload, retrieval, and deletion
 *
 * @module routes/bulletins
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Bulletin from '../models/Bulletin.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/bulletins');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename: bulletin-YYYY-MM-DD-timestamp.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `bulletin-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter - only allow PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit
  }
});

/**
 * GET /api/bulletins/current
 * Get the current week's bulletin (public)
 */
router.get('/current', async (req, res) => {
  try {
    const bulletin = await Bulletin.getCurrentBulletin();

    if (!bulletin) {
      return res.status(404).json({
        success: false,
        message: 'No bulletin available'
      });
    }

    // Increment view count
    await bulletin.incrementViews();

    res.json({
      success: true,
      bulletin: {
        id: bulletin._id,
        title: bulletin.title,
        description: bulletin.description,
        weekOf: bulletin.weekOf,
        filename: bulletin.filename,
        fileSize: bulletin.fileSize,
        viewCount: bulletin.viewCount,
        uploadedAt: bulletin.uploadedAt
      }
    });
  } catch (error) {
    console.error('Error fetching current bulletin:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bulletin',
      error: error.message
    });
  }
});

/**
 * GET /api/bulletins/file/:filename
 * Serve the bulletin PDF file (public)
 */
router.get('/file/:filename', async (req, res) => {
  try {
    const { filename } = req.params;

    // Security: validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename'
      });
    }

    const filePath = path.join(__dirname, '../uploads/bulletins', filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Set headers for PDF viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

    // Stream the file
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving bulletin file:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving file',
      error: error.message
    });
  }
});

/**
 * GET /api/bulletins
 * Get all bulletins with pagination (admin only)
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, activeOnly = 'false' } = req.query;

    const query = activeOnly === 'true' ? { isActive: true } : {};

    const bulletins = await Bulletin.find(query)
      .sort({ weekOf: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('uploadedBy', 'name email')
      .exec();

    const count = await Bulletin.countDocuments(query);

    res.json({
      success: true,
      bulletins,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBulletins: count
    });
  } catch (error) {
    console.error('Error fetching bulletins:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bulletins',
      error: error.message
    });
  }
});

/**
 * POST /api/bulletins/upload
 * Upload a new bulletin PDF (admin only)
 */
router.post('/upload', authenticate, upload.single('bulletin'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { title, description, weekOf } = req.body;

    if (!title || !weekOf) {
      // Delete uploaded file if validation fails
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Title and weekOf date are required'
      });
    }

    // Deactivate any existing bulletins for this week
    await Bulletin.deactivateOldBulletins(new Date(weekOf));

    // Create new bulletin record
    const bulletin = new Bulletin({
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      title,
      description: description || '',
      weekOf: new Date(weekOf),
      uploadedBy: req.user._id,
      isActive: true
    });

    await bulletin.save();

    res.status(201).json({
      success: true,
      message: 'Bulletin uploaded successfully',
      bulletin: {
        id: bulletin._id,
        title: bulletin.title,
        description: bulletin.description,
        weekOf: bulletin.weekOf,
        filename: bulletin.filename,
        fileSize: bulletin.fileSize,
        uploadedAt: bulletin.uploadedAt
      }
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    console.error('Error uploading bulletin:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading bulletin',
      error: error.message
    });
  }
});

/**
 * DELETE /api/bulletins/:id
 * Delete a bulletin (admin only)
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const bulletin = await Bulletin.findById(id);

    if (!bulletin) {
      return res.status(404).json({
        success: false,
        message: 'Bulletin not found'
      });
    }

    // Delete the file from disk
    try {
      await fs.unlink(bulletin.filePath);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await Bulletin.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Bulletin deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting bulletin:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting bulletin',
      error: error.message
    });
  }
});

/**
 * PATCH /api/bulletins/:id/activate
 * Activate/deactivate a bulletin (admin only)
 */
router.patch('/:id/activate', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const bulletin = await Bulletin.findById(id);

    if (!bulletin) {
      return res.status(404).json({
        success: false,
        message: 'Bulletin not found'
      });
    }

    // If activating, deactivate other bulletins for the same week
    if (isActive) {
      await Bulletin.deactivateOldBulletins(bulletin.weekOf);
    }

    bulletin.isActive = isActive;
    await bulletin.save();

    res.json({
      success: true,
      message: `Bulletin ${isActive ? 'activated' : 'deactivated'} successfully`,
      bulletin
    });
  } catch (error) {
    console.error('Error updating bulletin status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating bulletin',
      error: error.message
    });
  }
});

export default router;
