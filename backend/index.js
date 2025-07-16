//import wiring backend
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js'; // use .js extension explicitly

const app = express()
const port = 8080

app.get('/', (req, res) =>{
    res.send('Hello (from server)')
})

app.listen(port, () => console.log('Listening on port: ' + port))