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
    minlength: 6 // This blocks passwords like "123"
  },
  idNumber: {
    type: String,
    required: [true, 'Please add an ASTU ID'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Please select a department'] 
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

// --- FIXED MIDDLEWARE ---
userSchema.pre('save', async function (next) {
  // 1. Only hash if the password is new or being changed
  if (!this.isModified('password')) {
    return next(); 
  }

  try {
    // 2. Use asynchronous salt and hash for better performance/compatibility
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // 3. Explicitly call next() to finish the cycle
    next(); 
  } catch (error) {
    // 4. Pass errors to the controller to see them in the browser alert
    next(error); 
  }
});

module.exports = mongoose.model('User', userSchema);