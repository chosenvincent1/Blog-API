const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;