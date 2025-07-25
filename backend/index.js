//  Import wiring for backend
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; //  Add CORS middleware
import readingsRoute from './routes/readings.js'; // must include .js extension!
import eventsRoute from './routes/events.js'; //  Event route for admin dashboard
import connectDB from './config/db.js'; // use .js extension explicitly

dotenv.config(); //  Load .env configs
connectDB();     //  Connect to MongoDB before routes mount

const app = express(); //  INIT app BEFORE using middleware
const port = 8080;

//  Parse incoming JSON bodies for POST requests
app.use(express.json());

//  Enable CORS to allow frontend at localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // only allow requests from React dev server
  methods: ['GET', 'POST'],        // support reading and creation
  credentials: true
}));

//  Optional: Allow any origin (for testing only—not safe for production)
// app.use(cors()); //  This allows all domains—commented out intentionally

//  Mount API routes
app.use('/api/readings', readingsRoute); // dynamic scripture scraping
app.use('/api/events', eventsRoute);     // admin event creation & listing

//  Base route for testing
app.get('/', (req, res) => {
  res.send('Hello (from server)');
});

//  Start the server
app.listen(port, () => console.log(' Listening on port: ' + port));