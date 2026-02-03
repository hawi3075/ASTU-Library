const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to your User model
require('dotenv').config();

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const hashedEmail = "admin@astu.edu.et";
    const existing = await User.findOne({ email: hashedEmail });
    
    if (!existing) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
            name: "Librarian Admin",
            email: hashedEmail,
            password: hashedPassword,
            role: "admin"
        });
        console.log("✅ Admin user created: admin@astu.edu.et / admin123");
    } else {
        console.log("ℹ️ Admin user already exists");
    }
    process.exit();
};

seedAdmin();