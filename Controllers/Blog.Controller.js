const Blog = require('../Models/Blog.Model');
const mongoose = require('mongoose');

async function addBlog(req, res){
    try {
        const { author, title, description } = req.body;
        console.log(author)
        console.log(title)
        console.log(description)
        if(!author.trim().length > 0 || !title.trim().length > 0 || !description.trim().length > 0) {
            return res.status(404).json({msg: 'All field must not be empty'});
        }

        const newBlog = new Blog({
            author,
            title,
            description,
        });

        await newBlog.save();
        res.status(200).json({msg: 'Blog created successfully', newBlog});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured'})
    }
}

async function getAllBlogs(req, res){
    try {
        const blogs = await Blog.find();
        if(!blogs.length > 0){
            return res.status(404).json({msg: 'No blog found'})
        }
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured'})
    }
}

async function getSingleBlog(req, res){
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(404).json({msg: 'Blog not found'});
        }

        res.status(200).json(blog)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured'})
    }
}

async function updateBlog(req, res){
    try {
        const { id } = req.params;
        const { newTitle, newDescription } = req.body;

        const blogToUpdate = await Blog.findOne({_id: id});

        if(!blogToUpdate) {
            return res.status(404).json({msg: 'No blog found'});
        }

        if(!newTitle.trim().length > 0 || !newDescription.trim().length > 0){
            return res.status(400).json({msg: 'All fields must not be empty'})
        }

        blogToUpdate.title = newTitle || blogToUpdate.title;
        blogToUpdate.description = newDescription || blogToUpdate.description;

        await blogToUpdate.save();

        res.status(200).json({msg: "Blog updated successfully", blogToUpdate})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured'})
    }
}

async function deleteBlog(req, res){
    try {
        const { id } = req.params;
        const validId = mongoose.Types.ObjectId.isValid(id)

        if(!validId){
            return res.status(400).json({msg: 'Invalid Id'});
        }

        const removedBlog = await Blog.findOneAndDelete(id);

        if(!removedBlog){
            return res.status(404).json({msg: 'Blog not found'})
        }

        const newBlogList = await Blog.find();
        res.status(200).json({msg: 'Blog deleted', newBlogList});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occured'})
    }
}

module.exports = {
    getAllBlogs,
    addBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}