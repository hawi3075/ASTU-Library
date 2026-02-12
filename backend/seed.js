const mongoose = require('mongoose');
const User = require('./models/User'); 
require('dotenv').config();

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = "admin@astu.edu.et";
    const existing = await User.findOne({ email });
    
    if (!existing) {
        // DO NOT HASH HERE. Let the User model do it automatically.
        await User.create({
            fullName: "Librarian Admin",
            email: email,
            password: "admin123", // Plain text here, model will hash it
            idNumber: "ADMIN-001",
            department: "Library",
            role: "admin"
        });
        console.log("✅ Admin user created!");
    }
    process.exit();
};
seedAdmin();