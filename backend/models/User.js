const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  idNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  location: { type: String, default: "Adama, Ethiopia" }
}, { timestamps: true });

// --- FIXED MIDDLEWARE ---
userSchema.pre('save', async function (next) {
  // Use 'this' to refer to the user document
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // Directly calling next() here is the safest way
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);