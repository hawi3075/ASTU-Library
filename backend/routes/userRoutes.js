const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user (Student or Auto-Admin)
// @route   POST /api/users/register
router.post('/register', async (req, res) => {
    const { fullName, email, password, idNumber, department } = req.body;

    try {
        // 1. Check if user already exists by email or ID Number
        const userExists = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { idNumber }] 
        });

        if (userExists) {
            return res.status(400).json({ 
                message: userExists.email === email.toLowerCase() 
                    ? 'Email already registered' 
                    : 'ASTU ID already registered' 
            });
        }

        // 2. ADVANCED ADMIN CHECK
        // Any registration using this specific email automatically becomes an Admin.
        const isAdminEmail = email.toLowerCase() === 'admin@astu.edu.et'; 

        // 3. Create the User in MongoDB
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password,
            idNumber, // Matches your User.js model
            department,
            role: isAdminEmail ? 'admin' : 'student' 
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role, // Returns 'admin' if email matched
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        // Log errors to VS Code terminal to catch password hashing crashes
        console.error("❌ REGISTRATION ERROR:", error.message);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: "Login Error", error: error.message });
    }
});

// @desc    Get all users (Admin Only)
// @route   GET /api/users
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
});

// @desc    Delete user (Admin Only)
// @route   DELETE /api/users/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;