const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.get('/', bookController.getAllBooks)
router.get('/:category', bookController.getBooksByCategory)

module.exports = router