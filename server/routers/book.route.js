const express = require('express')
const router = express.Router()

const auth = require('../middlewares/adminAuth')

const bookController = require('../controllers/book.controller')

router.get('/', bookController.getAllBooks)
router.get('/:id', bookController.getBookById)

router.post('/', auth, bookController.insertBook)

router.put('/', auth, bookController.updateBook)

router.delete('/:id', auth, bookController.deleteBook)

module.exports = router