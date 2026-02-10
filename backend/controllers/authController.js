const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Generate JWT Token
 * @param   {string} id - User ID
 * @returns {string} token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// --- 1. REGISTER USER ---
exports.registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password, idNumber, department, role } = req.body;

        // Basic Validation
        if (!fullName || !email || !password || !idNumber || !department) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the user
        // Note: Password hashing should ideally be a 'pre-save' hook in your User model
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password, 
            idNumber,
            department,
            role: role || 'student'
        });

        if (user) {
            res.status(201).json({
                success: true,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    department: user.department,
                    token: generateToken(user._id) // Log user in immediately
                }
            });
        }
    } catch (error) {
        // FIXED: Using next(error) handles the error through Express middleware properly
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// --- 2. LOGIN USER ---
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        // Compare password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    idNumber: user.idNumber,
                    department: user.department,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        if (typeof next === 'function') {
            next(error);
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};