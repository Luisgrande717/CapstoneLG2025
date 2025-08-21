/**
 * Email Subscription Routes
 * 
 * Handles newsletter and email subscription management
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import express from 'express';
import EmailSubscription from '../models/EmailSubscription.js';

const router = express.Router();

/**
 * @route   POST /api/subscriptions/subscribe
 * @desc    Subscribe to parish emails
 * @access  Public
 */
router.post('/subscribe', async (req, res) => {
  try {
    const {
      email,
      subscriptionTypes = {
        newsletter: true,
        events: true,
        announcements: true,
        prayers: false
      },
      preferredLanguage = 'en',
      source = 'footer'
    } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required'
      });
    }

    // Check if email already exists
    const existingSubscription = await EmailSubscription.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          error: 'This email is already subscribed'
        });
      } else {
        // Reactivate existing subscription
        existingSubscription.isActive = true;
        existingSubscription.subscriptionTypes = subscriptionTypes;
        existingSubscription.preferredLanguage = preferredLanguage;
        existingSubscription.source = source;
        await existingSubscription.save();

        return res.status(200).json({
          success: true,
          data: { subscription: existingSubscription },
          message: 'Email subscription reactivated successfully!'
        });
      }
    }

    // Create new subscription
    const newSubscription = new EmailSubscription({
      email: email.toLowerCase(),
      subscriptionTypes,
      preferredLanguage,
      source
    });

    await newSubscription.save();

    res.status(201).json({
      success: true,
      data: { subscription: newSubscription },
      message: 'Email subscription successful! Thank you for staying connected with us.'
    });

    console.log(`New email subscription: ${email}`);

  } catch (error) {
    console.error('Email subscription error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error during subscription'
    });
  }
});

/**
 * @route   POST /api/subscriptions/unsubscribe
 * @desc    Unsubscribe from emails using token
 * @access  Public
 */
router.post('/unsubscribe', async (req, res) => {
  try {
    const { token, email } = req.body;

    if (!token && !email) {
      return res.status(400).json({
        success: false,
        error: 'Unsubscribe token or email is required'
      });
    }

    let subscription;
    
    if (token) {
      subscription = await EmailSubscription.findOne({ unsubscribeToken: token });
    } else if (email) {
      subscription = await EmailSubscription.findOne({ email: email.toLowerCase() });
    }

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from email notifications'
    });

    console.log(`Email unsubscribed: ${subscription.email}`);

  } catch (error) {
    console.error('Email unsubscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during unsubscription'
    });
  }
});

/**
 * @route   GET /api/subscriptions/stats
 * @desc    Get subscription statistics (for admin)
 * @access  Public (basic stats only)
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await EmailSubscription.getSubscriptionStats();
    const totalSubscriptions = await EmailSubscription.countDocuments({ isActive: true });
    
    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    // Language breakdown
    const languageStats = await EmailSubscription.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$preferredLanguage',
          count: { $sum: 1 }
        }
      }
    ]);

    const languageBreakdown = languageStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions,
        bySource: formattedStats,
        byLanguage: languageBreakdown
      }
    });

  } catch (error) {
    console.error('Get subscription stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting statistics'
    });
  }
});

/**
 * @route   GET /api/subscriptions/list
 * @desc    Get subscription list (admin only - basic implementation)
 * @access  Public (TODO: Add admin authentication)
 */
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 50, language, source } = req.query;

    const filter = { isActive: true };
    if (language) filter.preferredLanguage = language;
    if (source) filter.source = source;

    const subscriptions = await EmailSubscription.find(filter)
      .select('email preferredLanguage source createdAt subscriptionTypes')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EmailSubscription.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        subscriptions,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get subscription list error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting subscription list'
    });
  }
});

export default router;