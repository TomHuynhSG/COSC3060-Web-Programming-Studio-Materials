const mongoose = require('mongoose');
const Part = require('./partModel'); // Import Part model
const Product = require('./productModel'); // Import Product model

const connectToDatabase = async () => {
    await mongoose.connect('mongodb+srv://tomhuynh:mypassword@mydatabasecluster.xnarqwq.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster');

    console.log('Connected to the database successfully!');

    // Creating parts
    const part1 = await new Part({
        partno: '123-aff-456',
        name: '#4 grommet',
        qty: 94,
        cost: 0.94,
        price: 3.99
    }).save();

    const part2 = await new Part({
        partno: '456-dff-789',
        name: '#5 bolt',
        qty: 150,
        cost: 0.20,
        price: 0.99
    }).save();

    // Creating a product and linking parts
    const product = new Product({
        name: 'left-handed smoke shifter',
        manufacturer: 'Acme Corp',
        catalog_number: '1234',
        parts: [part1._id, part2._id]
    });

    await product.save();
    console.log('Product with parts has been added!');
};

connectToDatabase().catch(console.error);