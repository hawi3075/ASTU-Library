const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');

// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files go to your uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// @route   POST /api/books
// @desc    Deploy a new book
router.post('/', upload.single('bookFile'), async (req, res) => {
  try {
    const { title, author, category, description } = req.body;
    
    const newBook = new Book({
      title,
      author,
      category,
      description,
      fileUrl: `/uploads/${req.file.filename}` // Store the link for the frontend
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/books
// @desc    Get all books for Student Dashboard
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;