const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const upload = multer(); // Initialize multer

const { createBlog ,getAllBlogs , getBlogById} = require('../Controllers/Blog');
const AuthController = require('../Middlewares/user');

// Create blog route
router.post('/createBlog', AuthController.isLoggedIn, upload.single('image'), createBlog);

// Get all blogs
router.get('/blog/all', getAllBlogs);
// Get a specific blog by ID
router.get('/blog/:id', getBlogById);


module.exports = router;
