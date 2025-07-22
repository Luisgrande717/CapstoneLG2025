// 📦 Import wiring for backend
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Add CORS middleware
import readingsRoute from './routes/readings.js'; // must include .js extension!
import connectDB from './config/db.js'; // use .js extension explicitly

dotenv.config();

const app = express();
const port = 8080;

// 🌐 Enable CORS to allow frontend at localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // ✅ only allow requests from React dev server
  methods: ['GET'],
  credentials: true
}));

// 🔧 Optional: Allow any origin (for testing only—not safe for production)
// app.use(cors()); // ❌ This allows all domains—commented out intentionally

// 🔌 Mount readings route
app.use('/api/readings', readingsRoute);

// 🛠️ Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello (from server)');
});

// 🚀 Start the server
app.listen(port, () => console.log('Listening on port: ' + port));