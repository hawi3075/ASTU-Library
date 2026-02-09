const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6 // Requires 6+ characters
  },
  idNumber: {
    type: String,
    required: [true, 'Please add an ASTU ID'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Please select a department'] // Field causing the error
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  location: {
    type: String,
    default: "Adama, Ethiopia"
  }
}, { timestamps: true });

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
  // Check if password was changed
  if (!this.isModified('password')) {
    return next(); // Correctly invokes the next middleware
  }

  try {
    const salt = await bcrypt.hashSync(this.password, 10); // Using standard sync for reliability
    this.password = salt;
    next(); 
  } catch (error) {
    next(error); // Passes the error to the controller
  }
});

module.exports = mongoose.model('User', userSchema);