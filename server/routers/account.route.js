const express = require('express')
const router = express.Router()

const accountController = require('../controllers/account.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, accountController.getMyAccount)
router.get('/login', accountController.getLogin)
router.get('/signup', auth, accountController.getSignup)

router.post('/login', accountController.postLogin)

module.exports = router