/**
 * Member Authentication and Management Routes
 * 
 * Handles member registration, login, profile management
 * and community engagement features
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import Member from '../models/Member.js';
import EmailSubscription from '../models/EmailSubscription.js';
import { generateToken } from '../middleware/auth.js';

const router = express.Router();

// JWT Secret for members (separate from admin)
const JWT_SECRET = process.env.JWT_SECRET || 'parish-member-secret-key-2025';

/**
 * Generate JWT token for member
 */
const generateMemberToken = (member) => {
  return jwt.sign(
    {
      id: member._id,
      email: member.email,
      type: 'member'
    },
    JWT_SECRET,
    { expiresIn: '30d' } // Longer expiry for members
  );
};

/**
 * @route   POST /api/members/register
 * @desc    Register new parish member
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      preferredLanguage = 'en',
      address,
      emergencyContact
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email, password, first name, and last name'
      });
    }

    // Check if member already exists
    const existingMember = await Member.findOne({ email: email.toLowerCase() });
    
    if (existingMember) {
      return res.status(400).json({
        success: false,
        error: 'A member with this email already exists'
      });
    }

    // Create new member with active status (auto-approved)
    const memberData = {
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      preferredLanguage,
      membershipStatus: 'active', // Auto-approve new members
      address,
      emergencyContact
    };

    const newMember = new Member(memberData);
    
    // Generate email verification token
    const verificationToken = newMember.generateEmailVerificationToken();
    
    await newMember.save();

    // Create email subscription for the new member
    try {
      const emailSubscription = new EmailSubscription({
        email: email.toLowerCase(),
        subscriptionTypes: {
          newsletter: true,
          events: true,
          announcements: true,
          prayers: false
        },
        preferredLanguage,
        source: 'member_registration'
      });
      await emailSubscription.save();
      console.log(`Email subscription created for member: ${email}`);
    } catch (subscriptionError) {
      // Don't fail registration if email subscription fails
      console.warn('Email subscription creation failed:', subscriptionError.message);
    }

    // Generate JWT token
    const token = generateMemberToken(newMember);

    res.status(201).json({
      success: true,
      data: {
        token,
        member: {
          id: newMember._id,
          email: newMember.email,
          firstName: newMember.firstName,
          lastName: newMember.lastName,
          fullName: newMember.fullName,
          membershipStatus: newMember.membershipStatus,
          preferredLanguage: newMember.preferredLanguage,
          memberSince: newMember.memberSince,
          isEmailVerified: newMember.isEmailVerified
        }
      },
      message: 'Registration successful! Welcome to Our Lady of Fatima Parish.'
    });

    // TODO: Send welcome email with verification link
    console.log(`New member registered: ${newMember.email}`);
    console.log(`Verification token: ${verificationToken}`);

  } catch (error) {
    console.error('Member registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

/**
 * @route   POST /api/members/login
 * @desc    Member login
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Find member by email
    const member = await Member.findByEmail(email);
    
    if (!member) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await member.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    await member.updateLastLogin();

    // Generate token
    const token = generateMemberToken(member);

    res.status(200).json({
      success: true,
      data: {
        token,
        member: {
          id: member._id,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          fullName: member.fullName,
          membershipStatus: member.membershipStatus,
          preferredLanguage: member.preferredLanguage,
          memberSince: member.memberSince,
          isEmailVerified: member.isEmailVerified,
          lastLogin: member.lastLogin
        }
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Member login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

/**
 * Simple authentication middleware for member routes
 */
const authenticateMember = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. Please log in.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type !== 'member') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token type'
      });
    }

    const member = await Member.findById(decoded.id).select('-password');
    
    if (!member || !member.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Member not found or inactive'
      });
    }

    req.member = member;
    next();

  } catch (error) {
    console.error('Member authentication error:', error);
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

/**
 * @route   GET /api/members/profile
 * @desc    Get member profile
 * @access  Private/Member
 */
router.get('/profile', authenticateMember, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        member: {
          id: req.member._id,
          email: req.member.email,
          firstName: req.member.firstName,
          lastName: req.member.lastName,
          fullName: req.member.fullName,
          phone: req.member.phone,
          address: req.member.address,
          fullAddress: req.member.fullAddress,
          dateOfBirth: req.member.dateOfBirth,
          membershipStatus: req.member.membershipStatus,
          preferredLanguage: req.member.preferredLanguage,
          ministries: req.member.ministries,
          emergencyContact: req.member.emergencyContact,
          emailSubscriptions: req.member.emailSubscriptions,
          memberSince: req.member.memberSince,
          isEmailVerified: req.member.isEmailVerified,
          lastLogin: req.member.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting profile'
    });
  }
});

/**
 * @route   PUT /api/members/profile
 * @desc    Update member profile
 * @access  Private/Member
 */
router.put('/profile', authenticateMember, async (req, res) => {
  try {
    const allowedFields = [
      'firstName', 'lastName', 'phone', 'address', 'dateOfBirth',
      'preferredLanguage', 'ministries', 'emergencyContact', 'emailSubscriptions'
    ];

    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const updatedMember = await Member.findByIdAndUpdate(
      req.member._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: { member: updatedMember },
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error updating profile'
    });
  }
});

/**
 * @route   GET /api/members/stats
 * @desc    Get membership statistics (for admin)
 * @access  Public (basic stats only)
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await Member.getMembershipStats();
    
    const formattedStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    const totalMembers = await Member.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        byStatus: formattedStats
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting statistics'
    });
  }
});

export default router;