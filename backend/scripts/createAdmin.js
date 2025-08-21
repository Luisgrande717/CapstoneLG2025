/**
 * Script to create the first admin user
 * 
 * Run this script to create an initial admin account for the parish website
 * Usage: node scripts/createAdmin.js
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

/**
 * Create admin user function
 */
const createAdminUser = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Username: ${existingAdmin.username}`);
      process.exit(0);
    }

    // Create the admin user
    const adminData = {
      username: 'admin',
      email: 'admin@olfperthamboy.com',
      password: 'ParishAdmin2025!', // Change this in production!
      firstName: 'Parish',
      lastName: 'Administrator',
      role: 'admin'
    };

    console.log('👤 Creating admin user...');
    const admin = new User(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('📋 Login Details:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Username: ${adminData.username}`);
    console.log(`   Password: ${adminData.password}`);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('🌐 Access the admin panel at: http://localhost:5173/admin/login');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.code === 11000) {
      console.log('📧 User with this email or username already exists');
    }
  } finally {
    await mongoose.connection.close();
    console.log('🔚 Database connection closed');
    process.exit(0);
  }
};

// Run the script
createAdminUser();