exports.registerUser = async (req, res) => {
    const { name, email, password, role, idNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'student', // Defaults to student if not specified
        idNumber
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // Essential for frontend redirection
            token: generateToken(user._id),
        });
    }
};