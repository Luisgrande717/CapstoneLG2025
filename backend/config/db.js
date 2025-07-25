// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('[MongoDB URI]', uri); // ✅ Should show full string

  if (!uri || typeof uri !== 'string') {
    console.error(' MONGODB_URI is missing or invalid in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(' MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;