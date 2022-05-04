const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.get('/', bookController.getAllBooks)
router.get('/trypost', bookController.tryPost)
router.get('/:id', bookController.getBookById)
// router.put('/')
router.post('/', bookController.createBook)
// router.get('/:category', bookController.getBooksByCategory)

module.exports = router