const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./app').User; // Assuming User model is exported from app.js or defined similarly

const MONGODB_URI = 'mongodb+srv://tom:mypassword@cluster0.fzbjkul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const usersToSeed = [
  { username: 'admin', password: 'secret' }, // Plain text for insecure login example
  { username: 'john', password: bcrypt.hashSync('nodejs', 10) },
  { username: 'alice', password: bcrypt.hashSync('password123', 10) },
  { username: 'bob', password: bcrypt.hashSync('securepass', 10) },
  { username: 'testuser', password: 'testpassword' } // Plain text for insecure login example
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas for seeding.");

    // Optional: Clear existing users if you want a fresh seed every time
    // await User.deleteMany({}); 
    // console.log("Cleared existing users.");

    for (const userData of usersToSeed) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`User ${user.username} seeded.`);
      } else {
        console.log(`User ${userData.username} already exists. Skipping.`);
      }
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas.");
  }
}

// Define user schema and model (if not importing from app.js)
// This is a simplified version. If your app.js exports User, prefer that.
if (!User) {
    const userSchema = new mongoose.Schema({
        username: String,
        password: String 
    });
    // Re-assign User if it was not imported
    // This is a common pattern but ensure User model is defined only once if possible
    // For this standalone script, defining it here is okay if app.js model isn't easily accessible.
    // However, the ideal way is to export User from app.js or a dedicated models file.
    // For simplicity of this request, we'll redefine it here, assuming it might not be exported.
    global.User = mongoose.model('User', userSchema); 
}


seedDB();
