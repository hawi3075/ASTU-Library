const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // ✅ Forces the server to fail fast (5s) if the DB is unreachable 
      // instead of making your frontend "buffer" for 10-30 seconds.
      serverSelectionTimeoutMS: 5000,
      
      // ✅ Helps maintain a stable connection on slower networks
      socketTimeoutMS: 45000,
    });

    console.log(`✅ ASTU MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // This will now catch the EXACT reason (e.g., "Bad Password" or "IP Not Whitelisted")
    console.error(`❌ Database Connection Failed: ${error.message}`);
    
    // Exit process with failure so nodemon restarts and tries again
    process.exit(1);
  }
};

module.exports = connectDB;