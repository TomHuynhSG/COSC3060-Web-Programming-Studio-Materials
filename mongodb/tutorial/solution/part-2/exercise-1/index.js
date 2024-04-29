// import the schema objects from model.js
const { User, Post, Comment, Category }= require('./model');

// Create example documents

// Example of creating a user and posts
async function createBlogData() {
    const user = new User({ name: 'John Doe', email: 'john@example.com' });
    await user.save();

    const post1 = new Post({
        title: 'Post One',
        content: 'Content of post one',
        author: user._id
    });
    await post1.save();

    const post2 = new Post({
        title: 'Post Two',
        content: 'Content of post two',
        author: user._id
    });
    await post2.save();

    const comment1 = new Comment({
        text: 'Great post!',
        author: user._id,
        post: post1._id
    });
    await comment1.save();

    const category1 = new Category({
        name: 'Technology',
        posts: [post1._id, post2._id]
    });
    await category1.save();

    // Query to find a post, its comments and categories
    const postWithDetails = await Post.findById(post1._id)
        .populate('comments')
        .populate('categories');
    
    console.log(postWithDetails);
}

createBlogData();