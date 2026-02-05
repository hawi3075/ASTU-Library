const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Changed 'name' to 'fullName' to match your React form state
  fullName: { 
    type: String, 
    required: [true, 'Please add a full name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Please add a password'],
    minlength: 6 
  },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'librarian'], // Added 'librarian' just in case
    default: 'student' 
  },
  // Added required:true so every student MUST have their ASTU ID
  idNumber: { 
    type: String, 
    required: [true, 'Please add your ASTU ID'],
    unique: true 
  }
}, { timestamps: true });

// --- PASSWORD ENCRYPTION ---
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- HELPER METHOD FOR LOGIN ---
// This allows you to call user.matchPassword(enteredPassword) in your controller
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);