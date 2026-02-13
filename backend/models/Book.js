const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    pdfUrl: { type: String, required: true },
    // ADD THIS FIELD - This is why it is currently erroring
    isImportant: { 
        type: Boolean, 
        default: false 
    }, 
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);