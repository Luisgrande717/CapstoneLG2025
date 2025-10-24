/**
 * Email Subscription Routes
 * 
 * Handles newsletter and email subscription management
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import EmailSubscription from '../models/EmailSubscription.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for email attachments (memory storage for email sending)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and documents are allowed'));
    }
  }
});

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
 * @desc    Get subscription list (admin only)
 * @access  Private (Admin)
 */
router.get('/list', authenticate, requireAdmin, async (req, res) => {
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

/**
 * @route   POST /api/subscriptions/send-mass-email
 * @desc    Send mass email to all subscribers (admin only)
 * @access  Private (Admin)
 */
router.post('/send-mass-email', authenticate, requireAdmin, upload.single('attachment'), async (req, res) => {
  try {
    const { subject, message, language, selectedEmails } = req.body;

    // Validation
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Subject and message are required'
      });
    }

    // Get subscriber emails
    let recipients;
    if (selectedEmails && selectedEmails.length > 0) {
      // Send to selected emails only
      recipients = JSON.parse(selectedEmails);
    } else {
      // Send to all active subscribers
      const filter = { isActive: true };
      if (language) filter.preferredLanguage = language;

      const subscriptions = await EmailSubscription.find(filter).select('email');
      recipients = subscriptions.map(sub => sub.email);
    }

    if (recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No recipients found'
      });
    }

    // Create email transporter (using Gmail as example - configure in .env)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'olfperthamboy@gmail.com',
        pass: process.env.EMAIL_PASSWORD // App-specific password required
      }
    });

    // Prepare email options
    const mailOptions = {
      from: `"Our Lady of Fatima Parish" <${process.env.EMAIL_USER || 'olfperthamboy@gmail.com'}>`,
      bcc: recipients, // Use BCC to hide recipient emails from each other
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2c3e50; color: white; padding: 20px; text-align: center;">
            <h1>Our Lady of Fatima Parish</h1>
            <p style="margin: 0;">380 Smith Street, Perth Amboy, NJ</p>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 20px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background-color: #34495e; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>Our Lady of Fatima Parish</p>
            <p>Phone: (732) 442-6634 | Email: olfperthamboy@gmail.com</p>
            <p style="margin-top: 10px; font-size: 10px;">
              You received this email because you subscribed to parish updates.
            </p>
          </div>
        </div>
      `
    };

    // Add attachment if provided
    if (req.file) {
      mailOptions.attachments = [{
        filename: req.file.originalname,
        content: req.file.buffer
      }];
    }

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `Email sent successfully to ${recipients.length} recipient(s)`,
      data: {
        recipientCount: recipients.length
      }
    });

    console.log(`Mass email sent to ${recipients.length} subscribers: "${subject}"`);

  } catch (error) {
    console.error('Mass email error:', error);

    if (error.message.includes('Invalid login')) {
      return res.status(500).json({
        success: false,
        error: 'Email service not configured. Please contact the system administrator.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

export default router;