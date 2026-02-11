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

// --- PASSWORD HASHING MIDDLEWARE ---
// This runs automatically before the user is saved to MongoDB
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// --- PASSWORD COMPARISON METHOD ---
// This is used in authController.js to check if the login password is correct
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);