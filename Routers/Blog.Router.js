const express = require('express');

const { getAllBlogs, addBlog, getSingleBlog, updateBlog, deleteBlog } = require('../Controllers/Blog.Controller');

const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.get('/:id', getSingleBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', deleteBlog);

module.exports = blogRouter;