/**
 * Authentication Middleware for Admin System
 * 
 * Provides JWT token verification and role-based access control
 * for protecting admin routes in the parish website
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * JWT Secret key from environment variables
 */
const JWT_SECRET = process.env.JWT_SECRET || 'parish-admin-secret-key-2025';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

/**
 * Generate JWT token for user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies (if using cookie-based auth)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and check if still active
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Token is valid but user no longer exists'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User account has been deactivated'
      });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token has expired'
      });
    } else {
      console.error('Authentication error:', error);
      return res.status(500).json({
        success: false,
        error: 'Server error during authentication'
      });
    }
  }
};

/**
 * Middleware to check if user has admin role
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
  }

  next();
};

/**
 * Middleware to check if user has admin or moderator role
 */
export const requireModerator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: 'Moderator or admin access required'
    });
  }

  next();
};

/**
 * Middleware to check if user can access resource
 * (own resources or admin role)
 */
export const requireOwnershipOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  // Admin can access everything
  if (req.user.role === 'admin') {
    return next();
  }

  // Check if user owns the resource (assuming resource has createdBy field)
  const resourceUserId = req.params.userId || req.body.createdBy || req.resource?.createdBy;
  
  if (resourceUserId && resourceUserId.toString() === req.user._id.toString()) {
    return next();
  }

  return res.status(403).json({
    success: false,
    error: 'Access denied. You can only access your own resources.'
  });
};

/**
 * Optional authentication - doesn't fail if no token
 * Useful for routes that can be accessed by both authenticated and anonymous users
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (user && user.isActive) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Don't fail - just continue without user
    next();
  }
};

export default {
  generateToken,
  authenticate,
  requireAdmin,
  requireModerator,
  requireOwnershipOrAdmin,
  optionalAuth
};