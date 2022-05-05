const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, cartController.getCart)
router.get('/checkout', auth, cartController.getCheckout)
router.get('/data', auth, cartController.getCartJSON)

module.exports = router