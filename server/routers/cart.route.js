const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, cartController.getCart)

module.exports = router