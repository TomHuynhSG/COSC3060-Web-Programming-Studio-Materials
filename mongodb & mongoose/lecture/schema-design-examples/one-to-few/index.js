const mongoose = require('mongoose');
const User = require('./userModel'); // Import the User model

// Replace <yourusername> and <password> with your actual MongoDB Atlas credentials
const dbURI = 'mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        // Create a new user instance and add data
        const joe = new User({
            name: "Joe Karlsson",
            company: "MongoDB",
            addresses: [
                { street: "123 Sesame St", city: "Anytown", cc: "USA" },
                { street: "123 Avenue Q", city: "New York", cc: "USA" }
            ]
        });

        // Save the new user to the database
        return joe.save();
    })
    .then(() => {
        console.log('User has been added with multiple addresses!');
    })
    .catch((error) => {
        console.log(error.message);
    });