const Book = require('../models/Book');

// @desc    Create a new book
// @route   POST /api/books
const addBook = async (req, res) => {
  try {
    const { title, author, category } = req.body;

    // Check if multer successfully processed the file
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const newBook = new Book({
      title,
      author,
      category,
      // Store the path to the file in the database
      pdfUrl: `/uploads/${req.file.filename}`, 
      uploadedBy: req.user._id // From your protect middleware
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Deployment Error:", error.message);
    // This is the source of your 500 error
    res.status(500).json({ message: 'Server error during book deployment', error: error.message });
  }
};

module.exports = { addBook };