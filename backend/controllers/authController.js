const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- 1. REGISTER USER ---
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, idNumber, role } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Note: If your User model has a pre-save hook for bcrypt, 
    // you don't need to hash it here. 
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password, // Plain text here if model hashes it, or bcrypt.hash(password, 10)
      idNumber,
      role: role || 'student'
    });

    res.status(201).json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. LOGIN USER ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    // Compares login plain text with the hashed password in Atlas
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          idNumber: user.idNumber,
          department: user.department,
          location: user.location
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};