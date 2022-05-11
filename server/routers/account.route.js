const express = require('express')
const router = express.Router()

const accountController = require('../controllers/account.controller')
const auth = require('../middlewares/customerAuth')

router.get('/', auth, accountController.getMyAccount)
router.get('/login', accountController.getLogin)
router.get('/signup', accountController.getSignup)

router.put('/', auth, accountController.updateUser)
router.put('/address', auth, accountController.updateUserAddress)

router.post('/login', accountController.postLogin)
router.post('/signup', accountController.postSignup)

module.exports = router