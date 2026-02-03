const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// @desc    Issue a book
exports.issueBook = async (req, res) => {
    try {
        const { bookId, studentId, days } = req.body;
        const book = await Book.findById(bookId);
        if (!book || book.availableCopies <= 0) return res.status(400).json({ message: 'Book not available' });

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + parseInt(days));

        const transaction = await Transaction.create({ book: bookId, student: studentId, dueDate });
        book.availableCopies -= 1;
        await book.save();

        res.status(201).json(transaction);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Return a book
exports.returnBook = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.status === 'returned') return res.status(400).json({ message: 'Invalid transaction' });

        transaction.returnDate = new Date();
        transaction.status = 'returned';
        await transaction.save();

        const book = await Book.findById(transaction.book);
        book.availableCopies += 1;
        await book.save();

        res.json(transaction);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Get logged in user history
exports.getMyLoans = async (req, res) => {
    try {
        const history = await Transaction.find({ student: req.user._id }).populate('book');
        res.json(history);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Get all transactions (Admin)
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).populate('book student');
        res.json(transactions);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Transaction deleted' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};