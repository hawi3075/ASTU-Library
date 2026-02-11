const User = require('../models/User');
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
        const userExists = await User.findOne({ 
            $or: [
                { email: email.toLowerCase() },
                { idNumber: idNumber }
            ]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User with this email or ID already exists' });
        }

        // Create the user
        // The hashing happens automatically in User.js pre-save hook
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
                    token: generateToken(user._id)
                }
            });
        }
    } catch (error) {
        next(error);
    }
};

// --- 2. LOGIN USER ---
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // 1. Find the user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        // 2. Use the comparePassword method we added to the User model
        if (user && (await user.comparePassword(password))) {
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
            // This is triggered if password check fails or user doesn't exist
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};