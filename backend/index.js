/**
 * Our Lady of Fatima Parish API Server
 * 
 * A modern Express.js server providing:
 * - Daily scripture readings via web scraping
 * - Event management system
 * - MongoDB integration
 * - CORS configuration for frontend
 * - Comprehensive error handling
 * - Request logging and validation
 * 
 * @author Parish Development Team
 * @version 2.0.0
 * @since 2025
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Route imports
import readingsRoute from './routes/readings.js';
import eventsRoute from './routes/events.js';
import authRoute from './routes/auth.js';
import subscriptionsRoute from './routes/subscriptions.js';

// Database connection
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// ES Module directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Environment configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const FRONTEND_URLS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
];

/**
 * Initialize Express application with middleware
 */
const createApp = () => {
  const app = express();

  // Trust proxy for accurate client IPs
  app.set('trust proxy', 1);

  // Security Middleware
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"]
      }
    }
  }));

  // Rate limiting
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: 15 * 60 // seconds
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Stricter rate limiting for auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 authentication requests per windowMs
    message: {
      success: false,
      error: 'Too many authentication attempts, please try again later.',
      retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply general rate limiting to all requests
  app.use(generalLimiter);

  // Apply auth rate limiting to authentication routes
  app.use('/api/auth', authLimiter);

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Prevent HTTP Parameter Pollution attacks
  app.use(hpp());

  // Request logging middleware
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.path} - ${req.ip}`);
    next();
  });

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));


  // CORS configuration
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, etc.)
      if (!origin) return callback(null, true);
      
      if (FRONTEND_URLS.includes(origin) || NODE_ENV === 'development') {
        return callback(null, true);
      }
      
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400 // Cache preflight for 24 hours
  }));

  return app;
};

/**
 * Error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // CORS errors
  if (err.message.includes('CORS policy')) {
    error.message = 'Cross-origin request blocked';
    error.statusCode = 403;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error.message = message.join(', ');
    error.statusCode = 400;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error.message = message;
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    timestamp: new Date().toISOString()
  });
};

/**
 * 404 handler
 */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
};

/**
 * Mount API routes with proper error handling
 */
const mountRoutes = (app) => {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: NODE_ENV,
      version: '2.0.0'
    });
  });

  // API routes
  app.use('/api/readings', readingsRoute);
  app.use('/api/events', eventsRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/subscriptions', subscriptionsRoute);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Our Lady of Fatima Parish API',
      version: '2.0.0',
      documentation: '/api/docs',
      health: '/health'
    });
  });

  // 404 handler
  app.use(notFound);

  // Global error handler
  app.use(errorHandler);
};

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected successfully');

    // Create and configure app
    const app = createApp();
    mountRoutes(app);

    // Start listening
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 Allowed origins: ${FRONTEND_URLS.join(', ')}`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();