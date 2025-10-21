/**
 * Script to reset admin password
 * Run with: node scripts/resetAdminPassword.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const resetPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@olfperthamboy.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      process.exit(1);
    }

    // Reset password
    const newPassword = 'Fatima2025!';
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Admin password reset successfully!');
    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('   Login Credentials');
    console.log('═══════════════════════════════════════');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Password: ${newPassword}`);
    console.log('═══════════════════════════════════════');
    console.log('');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error resetting password:', error);
    process.exit(1);
  }
};

resetPassword();
