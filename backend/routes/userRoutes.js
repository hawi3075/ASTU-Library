const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Path is correct for a file in /routes/
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

// Helper to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName, // Matches Atlas
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

// @desc    Get all users
// @route   GET /api/users
router.get('/', protect, admin, async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;