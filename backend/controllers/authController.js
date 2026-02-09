const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- 1. REGISTER USER ---
exports.registerUser = async (req, res) => {
  try {
    // FIXED: Added 'department' to the destructuring
    const { fullName, email, password, idNumber, department, role } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // FIXED: Passing 'department' to the create method
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password, 
      idNumber,
      department, // This was missing!
      role: role || 'student'
    });

    res.status(201).json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    // This will now catch and show if 'department' is still missing
    res.status(500).json({ message: error.message });
  }
};

// --- 2. LOGIN USER ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

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