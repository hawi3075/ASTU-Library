const Book = require('../models/Book');

// @desc    Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get top featured books (REQUIRED FOR THE ROUTE ABOVE)
exports.getTopBooks = async (req, res) => {
    try {
        const books = await Book.find({}).sort({ totalCopies: -1 }).limit(5);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single book
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) res.json(book);
        else res.status(404).json({ message: 'Book not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create book (Admin only)
exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update book (Admin only)
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedBook) res.json(updatedBook);
        else res.status(404).json({ message: 'Book not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete book (Admin only)
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await Book.deleteOne({ _id: book._id });
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};