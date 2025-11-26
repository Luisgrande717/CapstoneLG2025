/**
 * TEMPORARY Setup Route - FOR INITIAL DEPLOYMENT ONLY
 *
 * This route creates the initial admin user
 * DELETE THIS FILE after running setup once!
 *
 * @author Parish Development Team
 * @version 1.0.0
 */

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Secret key to prevent unauthorized access
// Change this to a random string before deploying
const SETUP_SECRET = process.env.SETUP_SECRET || 'change-this-secret-key-12345';

/**
 * @route   POST /api/setup/create-admin
 * @desc    Create initial admin user (one-time use)
 * @access  Protected by secret key
 */
router.post('/create-admin', async (req, res) => {
  try {
    const { secret } = req.body;

    // Verify secret key
    if (secret !== SETUP_SECRET) {
      return res.status(403).json({
        success: false,
        error: 'Invalid secret key'
      });
    }

    // Check if any admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: 'Admin user already exists',
        adminInfo: {
          username: existingAdmin.username,
          email: existingAdmin.email,
          createdAt: existingAdmin.createdAt
        }
      });
    }

    // Create admin user
    const adminData = {
      username: 'admin',
      email: 'admin@fatima.com',
      password: 'Admin123!',  // CHANGE THIS PASSWORD AFTER FIRST LOGIN!
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true
    };

    const admin = new User(adminData);
    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        username: adminData.username,
        email: adminData.email,
        password: adminData.password,
        warning: '⚠️ CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!'
      },
      nextSteps: [
        '1. Login at /admin/login with the credentials above',
        '2. Change the password immediately',
        '3. DELETE the /backend/routes/setup.js file',
        '4. Remove the setup route from index.js',
        '5. Redeploy your application'
      ]
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create admin user',
      details: error.message
    });
  }
});

/**
 * @route   GET /api/setup/status
 * @desc    Check if setup is needed
 * @access  Public
 */
router.get('/status', async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      setupNeeded: adminCount === 0,
      adminCount,
      totalUsers,
      message: adminCount === 0
        ? 'Setup required - no admin users found'
        : 'Setup complete - admin users exist'
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check setup status'
    });
  }
});

export default router;
