const mongoose = require('mongoose');
const User = require('./userModel'); // Import the User model 

// Replace <yourusername> and <password> with your actual MongoDB Atlas credentials
const dbURI = 'mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        // Creating a new User
        const newUser = new User({
            name: 'Alice Johnson',
            company: 'Tech Solutions',
            twitter: '@alicej',
            twitch: undefined,
            tiktok: undefined,
            website: 'https://alicejohnson.com'
        });

        // Saving the new User to the database
        return newUser.save();
    })
    .then(() => {
        console.log('User has been added successfully!');
    })
    .catch((error) => {
        console.log(error.message);
    });