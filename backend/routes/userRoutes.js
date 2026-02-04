const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users - This should ideally be protected by admin middleware later
router.get('/', async (req, res) => {
    try {
        // Find all users but don't send their passwords!
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;