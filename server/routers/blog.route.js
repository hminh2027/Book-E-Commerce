const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog.controller')

router.get('/', blogController.getAllBlogs)
router.get('/:id', blogController.getBlogById)

// router.post('/', blogController.insertBlog)

module.exports = router