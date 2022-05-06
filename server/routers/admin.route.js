const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admin.controller')
const auth = require('../middlewares/adminAuth')

router.get('/', auth, adminController.getAdminPage)
router.get('/login', adminController.getLogin)

router.post('/login', adminController.postLogin)

module.exports = router