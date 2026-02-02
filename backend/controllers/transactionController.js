const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// @desc    Issue a book (Admin only)
exports.issueBook = async (req, res) => {
    const { bookId, studentId, days } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }

        // Calculate due date based on days provided
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + parseInt(days));

        const transaction = await Transaction.create({
            book: bookId,
            student: studentId,
            dueDate
        });

        // Reduce available copies
        book.availableCopies -= 1;
        await book.save();

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Return a book (Admin only)
exports.returnBook = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.status === 'returned') {
            return res.status(400).json({ message: 'Invalid transaction' });
        }

        transaction.returnDate = new Date();
        transaction.status = 'returned';

        // Logic for Fine Calculation (e.g., 5 Birr per late day)
        if (transaction.returnDate > transaction.dueDate) {
            const diffTime = Math.abs(transaction.returnDate - transaction.dueDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            transaction.fine = diffDays * 5; 
        }

        await transaction.save();

        // Increase available copies back in the library
        const book = await Book.findById(transaction.book);
        book.availableCopies += 1;
        await book.save();

        res.json({ message: 'Book returned successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current student's borrowing history
exports.getMyLoans = async (req, res) => {
    try {
        const history = await Transaction.find({ student: req.user._id }).populate('book');
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};