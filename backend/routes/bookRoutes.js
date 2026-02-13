const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');

// --- MULTER CONFIG ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// --- ROUTES ---

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// Add new book
router.post('/', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const book = new Book({
            ...req.body,
            pdfUrl: `/uploads/${req.file.filename}`,
            uploadedBy: req.user._id,
            isImportant: false
        });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// STAR TOGGLE ROUTE
router.patch('/:id/toggle-favorite', protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        book.isImportant = !book.isImportant; // Switches true/false
        await book.save();
        res.json(book);
    } catch (error) {
        console.error("DB Error:", error.message);
        res.status(500).json({ message: 'Check if isImportant is in your Model.' });
    }
});

// Delete book
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;