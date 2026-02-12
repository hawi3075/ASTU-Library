const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Make sure to import your middleware
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
router.get('/', protect, admin, async (req, res) => {
    try {
        // Find all users but don't send their passwords!
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // Safety: Don't allow deleting the admin account from the dashboard
            if (user.role === 'admin') {
                return res.status(400).json({ message: "Cannot delete an Admin account" });
            }

            await User.findByIdAndDelete(req.params.id);
            res.json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

module.exports = router;