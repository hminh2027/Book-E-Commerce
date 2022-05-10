const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin.controller')
const bookController = require('../controllers/book.controller')

const auth = require('../middlewares/adminAuth')

router.get('/', auth, adminController.getAdminPage)
router.get('/login', adminController.getLogin)
router.get('/book/', auth, adminController.getBooks)
router.get('/book/:id', auth, adminController.getBookById)
router.get('/book/create', auth, adminController.getBookCreate)

router.put('/book/:id', auth, bookController.updateBook)

router.post('/login', adminController.postLogin)
router.post('/book/create', auth, bookController.insertBook)

module.exports = router