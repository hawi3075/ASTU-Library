const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to create Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, idNumber } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // This now saves the role (admin/student) and the ASTU ID
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student', 
            idNumber
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};