const mongoose = require('mongoose');

// Replace <yourusername> and <password> with your username and actual password for the mongodb atlas cluster
mongoose.connect('mongodb+srv://<yourusername>:<password>@mydatabasecluster.6ydmoyi.mongodb.net/test_database?retryWrites=true&w=majority&appName=MyDatabaseCluster')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));





