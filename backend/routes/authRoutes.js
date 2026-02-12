const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
router.get('/', protect, admin, async (req, res) => {
    try {
        // Find all users but exclude passwords from the results for security
        const users = await User.find({}).select('-password');
        
        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch users', error: error.message });
    }
});

/**
 * @desc    Delete a user (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.role === 'admin') {
                return res.status(400).json({ message: 'Cannot delete an admin user' });
            }
            await user.deleteOne();
            res.json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not delete user' });
    }
});

module.exports = router;