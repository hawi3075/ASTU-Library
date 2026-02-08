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
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  idNumber: {
    type: String,
    required: [true, 'Please add an ASTU ID'],
    unique: true,
    uppercase: true
  },
  // --- 🌟 UPDATED DEPARTMENT FIELD 🌟 ---
  department: {
    type: String,
    required: [true, 'Please select a department'],
    // Default removed so it only saves what the user chooses in the form
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  location: {
    type: String,
    default: "Adama, Ethiopia"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// ENCRYPTION: This hashes the password before saving to MongoDB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);