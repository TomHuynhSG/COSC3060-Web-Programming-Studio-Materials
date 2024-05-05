const mongoose = require('mongoose');
const User = require('./userModel'); // Import the User model
const Task = require('./taskModel'); // Import the Task model


const connectToDatabase = async () => {
    await mongoose.connect('mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster');

    console.log('Connected to the database successfully!');

    // Creating users
    const user1 = await new User({
        name: 'Kate Monster'
    }).save();

    const user2 = await new User({
        name: 'John Doe'
    }).save();

    // Creating a task and linking users
    const task1 = await new Task({
        description: 'Write blog post about MongoDB schema design',
        due_date: new Date("2024-04-01"),
        owners: [user1._id, user2._id]
    }).save();

    // Linking task back to users
    user1.tasks.push(task1._id);
    user2.tasks.push(task1._id);
    await user1.save();
    await user2.save();

    console.log('Users and tasks have been created and linked successfully!');
};

connectToDatabase().catch(console.error);