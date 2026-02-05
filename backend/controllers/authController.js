const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * @desc    Generate a JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, password, idNumber, role } = req.body;

        // 1. Check if user already exists (by Email OR ID Number)
        const userExists = await User.findOne({ 
            $or: [ { email }, { idNumber } ] 
        });

        if (userExists) {
            return res.status(400).json({ 
                message: 'User with this email or ASTU ID already exists.' 
            });
        }

        // 2. Create user in MongoDB Atlas
        const user = await User.create({
            fullName,
            email,
            password, // Password hashing is handled in User.js pre-save hook
            idNumber,
            role: role || 'student'
        });

        if (user) {
            res.status(201).json({
                message: "Registration Successful!",
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 */
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });

        // 2. If user not in database, reject login
        if (!user) {
            return res.status(401).json({ message: 'User not found! Please register first.' });
        }

        // 3. Verify password using the method in models/User.js
        const isMatch = await user.matchPassword(password);

        if (isMatch) {
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials. Check your password.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};