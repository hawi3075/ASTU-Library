const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// --- ROUTES ---

/**
 * @desc    Get all books for the Dashboard
 * @route   GET /api/books
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        console.error("Dashboard Fetch Error:", error.message);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

/**
 * @desc    Add a new book (Admin only)
 * @route   POST /api/books
 */
router.post('/', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const { title, author, category, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a PDF file' });
        }

        const book = new Book({
            title,
            author,
            category,
            description,
            pdfUrl: `/uploads/${req.file.filename}`, 
            uploadedBy: req.user._id,
            isImportant: false 
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        console.error("Upload Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc    Toggle "isImportant" status (The Star Icon)
 * @route   PATCH /api/books/:id/toggle-favorite
 * @access  Private (Student/Admin)
 */
router.patch('/:id/toggle-favorite', protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Toggle the boolean value
        book.isImportant = !book.isImportant;
        
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        // This log will appear in your VS Code terminal if the database crashes
        console.error("FAVORITE TOGGLE ERROR:", error.message);
        res.status(500).json({ message: 'Database failed to update favorite status. Check if isImportant is in your Model.' });
    }
});

/**
 * @desc    Update book details
 * @route   PUT /api/books/:id
 */
router.put('/:id', protect, admin, upload.single('file'), async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.category = req.body.category || book.category;
            book.description = req.body.description || book.description;
            
            if (req.file) {
                book.pdfUrl = `/uploads/${req.file.filename}`;
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

/**
 * @desc    Delete book
 * @route   DELETE /api/books/:id
 */
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