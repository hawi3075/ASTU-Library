const express = require('express');
const router = express.Router();

// Temporary mock login to test your frontend
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // For now, let's allow any login to succeed so you can see the Dashboard
    if (email && password) {
        return res.status(200).json({
            _id: "1",
            name: "ASTU Student",
            email: email,
            token: "mock-token-for-testing"
        });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

router.post('/register', (req, res) => {
    res.status(201).json({ message: "Register successful" });
});

module.exports = router;