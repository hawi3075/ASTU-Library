const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Load env variables FIRST before any other local imports
dotenv.config();

// 2. Now import connectDB (it will now correctly see process.env.MONGO_URI)
const connectDB = require('./config/db.js');

// 3. Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});