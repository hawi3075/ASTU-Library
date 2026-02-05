const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
    dueDate: { type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000) } // 7 days from now
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);