// Setting up the connection to MongoDB Atlas using Mongoose here
const mongoose = require('mongoose');

// Replace my Mongodb Atlas connection string to your valid connection string 
mongoose.connect('mongodb+srv://tomhuynh:mypassword@mydatabasecluster.6ydmoyi.mongodb.net/?retryWrites=true&w=majority&appName=MyDatabaseCluster')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log(error.message));


//  Implement the Schema in Mongoose
const Schema = mongoose.Schema;

// 1. User Schema
// Relationships: The posts field is an array of ObjectIds referencing the Post model. This represents a one-to-many relationship between users and posts.
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

// 2. Post Schema
// Relationships:
// The author field references the User model, linking each post to its author.
// The comments field is an array of ObjectIds that reference the Comment model, facilitating a one-to-many relationship with comments.
// The categories field is an array of ObjectIds that reference the Category model, illustrating a many-to-many relationship.
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});


// 3. Comment Schema
// Relationships:
// The author field links each comment to a user.
// The post field links each comment to a specific post.
const commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

// 4. Category Schema
// Relationships: The posts field is an array of ObjectIds referencing the Post model, enabling a many-to-many relationship through reference.
const categorySchema = new Schema({
    name: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});


  
// Creating models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Category = mongoose.model('Category', categorySchema);

// Export the models for other files to use
module.exports = { User, Post, Comment, Category };