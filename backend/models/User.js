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
    minlength: 6
  },
  idNumber: {
    type: String,
    required: [true, 'Please add an ASTU ID'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Please select a department'] // No default, forces user choice
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
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);