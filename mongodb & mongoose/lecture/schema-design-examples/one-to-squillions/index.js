const mongoose = require('mongoose');
const Host = require('./hostModel'); // Import the Host model
const LogMessage = require('./logMessageModel'); // Import the LogMessage model

const connectToDatabase = async () => {
    await mongoose.connect('mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster');

    console.log('Connected to the database successfully!');

    // Creating a host
    const host = await new Host({
        name: 'goofy.example.com',
        ipaddr: '127.66.66.66'
    }).save();

    // Creating log messages and linking to the host
    const log1 = await new LogMessage({
        time: new Date("2014-03-28T09:42:41.382Z"),
        message: 'cpu is on fire!',
        host: host._id
    }).save();

    const log2 = await new LogMessage({
        time: new Date("2014-03-28T10:15:00.000Z"),
        message: 'rebooting...',
        host: host._id
    }).save();

    console.log('Host and log messages have been added!');
};

connectToDatabase().catch(console.error);