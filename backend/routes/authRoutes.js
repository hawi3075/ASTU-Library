const express = require('express');
const router = express.Router();
// ✅ Ensure these match the exported names in your authController.js
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student or admin
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', loginUser);

module.exports = router;