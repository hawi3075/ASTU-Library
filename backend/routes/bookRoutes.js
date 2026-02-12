const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION ---
// Handles saving PDFs to the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Ensure only PDFs are uploaded
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// --- ROUTES ---

// @desc    Get all books
// @route   GET /api/books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

// @desc    Get single book by ID
// @route   GET /api/books/:id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid Book ID' });
    }
});

// @desc    Add a new book (Librarian Portal)
// @route   POST /api/books
router.post('/', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const { title, author, category } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        const book = new Book({
            title,
            author,
            category,
            fileUrl: `/uploads/${req.file.filename}`, // Relative path for frontend
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        console.error("Deploy Error:", error.message);
        res.status(500).json({ message: 'Server error during book deployment' });
    }
});

// @desc    Update book details & file
// @route   PUT /api/books/:id
router.put('/:id', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.category = req.body.category || book.category;
            
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
// @route   DELETE /api/books/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during deletion' });
    }
});

module.exports = router;