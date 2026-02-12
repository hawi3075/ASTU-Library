const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Setup for File Updates
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// @desc    Get all books
router.get('/', async (req, res) => {
    const books = await Book.find({});
    res.json(books);
});

// @desc    Get single book by ID (FIXES THE 404 ON UPDATE PAGE)
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
});

// @desc    Update book details & file
router.put('/:id', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            if (req.file) {
                book.fileUrl = `/uploads/${req.file.filename}`;
            }
            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete book
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during deletion' });
    }
});

module.exports = router;