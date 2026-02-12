const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password, idNumber, department, role } = req.body;

        if (!fullName || !email || !password || !idNumber || !department) {
            res.status(400);
            throw new Error('Please fill in all required fields');
        }

        const userExists = await User.findOne({ 
            $or: [{ email: email.toLowerCase() }, { idNumber }]
        });

        if (userExists) {
            res.status(400);
            throw new Error('User with this email or ID already exists');
        }

        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password, 
            idNumber,
            department,
            role: role || 'student'
        });

        res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await user.comparePassword(password))) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};