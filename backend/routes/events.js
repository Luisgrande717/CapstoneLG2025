/**
 * Event Management Routes for Admin System
 * 
 * Comprehensive CRUD operations for parish events with
 * authentication, authorization, and calendar integration
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import express from 'express';
import Event from '../models/Event.js';
import { authenticate, requireModerator, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Get all published events (public) or all events (admin)
 * @access  Public/Private
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      startDate,
      endDate,
      featured,
      upcoming = 'true'
    } = req.query;

    let mongoQuery = {};

    // If not authenticated or not admin/moderator, only show published events
    if (!req.user || !['admin', 'moderator'].includes(req.user.role)) {
      mongoQuery.published = true;
    }

    // Filter by category
    if (category) {
      mongoQuery.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      mongoQuery.featured = true;
    }

    // Filter by date range
    if (startDate || endDate) {
      mongoQuery.startDate = {};
      if (startDate) mongoQuery.startDate.$gte = new Date(startDate);
      if (endDate) mongoQuery.startDate.$lte = new Date(endDate);
    }

    // Filter upcoming events
    if (upcoming === 'true') {
      mongoQuery.startDate = { ...mongoQuery.startDate, $gte: new Date() };
    }

    const events = await Event.find(mongoQuery)
      .populate('createdBy', 'firstName lastName')
      .populate('lastModifiedBy', 'firstName lastName')
      .sort({ startDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(mongoQuery);

    res.status(200).json({
      success: true,
      data: {
        events,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting events'
    });
  }
});

/**
 * @route   GET /api/events/upcoming
 * @desc    Get upcoming events for public display
 * @access  Public
 */
router.get('/upcoming', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const events = await Event.findUpcoming(parseInt(limit));

    res.status(200).json({
      success: true,
      data: { events }
    });

  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting upcoming events'
    });
  }
});

/**
 * @route   GET /api/events/calendar/:year/:month
 * @desc    Get events for calendar display
 * @access  Public
 */
router.get('/calendar/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const events = await Event.findByDateRange(startDate, endDate);

    res.status(200).json({
      success: true,
      data: { events }
    });

  } catch (error) {
    console.error('Get calendar events error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting calendar events'
    });
  }
});

/**
 * @route   GET /api/events/stats
 * @desc    Get event statistics for admin dashboard
 * @access  Private/Admin
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const now = new Date();
    
    // Get total events count
    const totalEvents = await Event.countDocuments();
    
    // Get published events count
    const publishedEvents = await Event.countDocuments({ published: true });
    
    // Get upcoming events count (published events with future start dates)
    const upcomingEvents = await Event.countDocuments({
      published: true,
      startDate: { $gte: now }
    });
    
    // Get draft events count
    const draftEvents = await Event.countDocuments({ published: false });
    
    // Get events by category
    const eventsByCategory = await Event.aggregate([
      { $match: { published: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    // Get recent events (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const recentEvents = await Event.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        publishedEvents,
        upcomingEvents,
        draftEvents,
        eventsByCategory,
        recentEvents
      }
    });

  } catch (error) {
    console.error('Get event stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting event statistics'
    });
  }
});

/**
 * @route   GET /api/events/:id
 * @desc    Get single event by ID
 * @access  Public
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    let mongoQuery = { _id: req.params.id };

    // If not authenticated or not admin/moderator, only show published events
    if (!req.user || !['admin', 'moderator'].includes(req.user.role)) {
      mongoQuery.published = true;
    }

    const event = await Event.findOne(mongoQuery)
      .populate('createdBy', 'firstName lastName')
      .populate('lastModifiedBy', 'firstName lastName');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { event }
    });

  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting event'
    });
  }
});

/**
 * @route   POST /api/events
 * @desc    Create new event (moderator/admin only)
 * @access  Private
 */
router.post('/', authenticate, requireModerator, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    };

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    // Populate user fields for response
    await savedEvent.populate('createdBy', 'firstName lastName');
    await savedEvent.populate('lastModifiedBy', 'firstName lastName');

    res.status(201).json({
      success: true,
      data: { event: savedEvent },
      message: 'Event created successfully'
    });

  } catch (error) {
    console.error('Create event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error creating event'
    });
  }
});

/**
 * @route   PUT /api/events/:id
 * @desc    Update event (moderator/admin only)
 * @access  Private
 */
router.put('/:id', authenticate, requireModerator, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      lastModifiedBy: req.user._id
    };

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'firstName lastName')
    .populate('lastModifiedBy', 'firstName lastName');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { event },
      message: 'Event updated successfully'
    });

  } catch (error) {
    console.error('Update event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error updating event'
    });
  }
});

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete event (admin only)
 * @access  Private/Admin
 */
router.delete('/:id', authenticate, requireModerator, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error deleting event'
    });
  }
});

/**
 * @route   PUT /api/events/:id/publish
 * @desc    Toggle event published status (moderator/admin only)
 * @access  Private
 */
router.put('/:id/publish', authenticate, requireModerator, async (req, res) => {
  try {
    const { published } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { 
        published,
        lastModifiedBy: req.user._id
      },
      { new: true }
    )
    .populate('createdBy', 'firstName lastName')
    .populate('lastModifiedBy', 'firstName lastName');

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { event },
      message: `Event ${published ? 'published' : 'unpublished'} successfully`
    });

  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error toggling publish status'
    });
  }
});

/**
 * @route   GET /api/events/categories/list
 * @desc    Get list of event categories
 * @access  Public
 */
router.get('/categories/list', (req, res) => {
  const categories = [
    'Youth', 'Liturgy', 'Service', 'Feast Day', 'Community', 
    'Mass', 'Prayer', 'Education', 'Fundraising'
  ];

  res.status(200).json({
    success: true,
    data: { categories }
  });
});

export default router;