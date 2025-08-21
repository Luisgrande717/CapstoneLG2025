/**
 * MongoDB Database Connection Configuration
 * 
 * Handles connection to MongoDB Atlas with proper error handling,
 * connection pooling, and event listeners for production monitoring
 * 
 * @author Parish Development Team
 * @version 2.0.0
 */

import mongoose from 'mongoose';

/**
 * MongoDB connection configuration
 */
const DB_CONFIG = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

/**
 * Establishes connection to MongoDB database
 * @returns {Promise<void>} Resolves when connected successfully
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  
  // Validate environment variable
  if (!uri || typeof uri !== 'string') {
    throw new Error('MONGODB_URI environment variable is missing or invalid');
  }

  try {
    // Remove deprecated options and use modern configuration
    const connection = await mongoose.connect(uri, DB_CONFIG);
    
    console.log(`🌍 MongoDB Connected: ${connection.connection.host}`);
    
    // Connection event listeners for monitoring
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Mongoose disconnected from MongoDB');
    });
    
    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed due to app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error; // Let the calling function handle the error
  }
};

/**
 * Checks if MongoDB connection is ready
 * @returns {boolean} True if connected
 */
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Gets current connection status
 * @returns {Object} Connection status information
 */
const getConnectionStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  return {
    state: states[mongoose.connection.readyState],
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    readyState: mongoose.connection.readyState
  };
};

export default connectDB;
export { isConnected, getConnectionStatus };