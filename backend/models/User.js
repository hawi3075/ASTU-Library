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

// --- FIXED: Async Middleware (Removed 'next') ---
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; // Just return to continue
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // In async hooks, simply finishing the function acts like calling next()
  } catch (error) {
    // If there is an error, throw it so Mongoose catches it
    throw error;
  }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if model already exists to prevent OverwriteModelError (common in dev)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);