const express = require('express');
const router = express.Router();
// Ensure BOTH are inside the curly braces
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;