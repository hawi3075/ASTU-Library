const Book = require('../models/Book');

// @desc    Get all books (Public)
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a book (Admin only)
exports.createBook = async (req, res) => {
    const { title, author, isbn, category, totalCopies } = req.body;
    try {
        const bookExists = await Book.findOne({ isbn });
        if (bookExists) return res.status(400).json({ message: 'Book with this ISBN already exists' });

        const book = new Book({
            title,
            author,
            isbn,
            category,
            totalCopies,
            availableCopies: totalCopies // Initially, all copies are available
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a book (Admin only)
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.category = req.body.category || book.category;
            book.totalCopies = req.body.totalCopies || book.totalCopies;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a book (Admin only)
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