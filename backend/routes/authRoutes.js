const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @desc    Register a new ASTU Student/Admin
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post('/login', loginUser);

module.exports = router;