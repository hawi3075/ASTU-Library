const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 1. Load env variables
dotenv.config();

// 2. Import connectDB
const connectDB = require('./config/db.js');

// 3. Connect to Database (We add .then to ensure it's working)
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 ENSURE UPLOADS FOLDER EXISTS
const uploadDir = path.join(__dirname, 'uploads'); // Removed leading slash for better pathing
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📁 STATIC FOLDER FOR UPLOADS
app.use('/uploads', express.static(uploadDir));

// --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('ASTU Library API is running...');
});

// --- ERROR HANDLING MIDDLEWARE ---
// This handles 404s
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// This handles all other errors (The Final Guard)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});