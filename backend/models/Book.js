const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  pdfUrl: { type: String, required: true }, // Ensure this matches your route
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Ensure the export is a direct model, not an object
module.exports = mongoose.model('Book', bookSchema);