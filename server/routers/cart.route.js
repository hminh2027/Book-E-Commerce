const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller')
const auth = require('../middlewares/customerAuth')

router.get('/', auth, cartController.getCart)
router.get('/checkout', auth, cartController.getCheckout)
router.get('/data', auth, cartController.getCartJSON)

router.post('/cartDetail', auth, cartController.insertCartDetail)

router.delete('/cartDetail/:id', auth, cartController.deleteCartDetail)

module.exports = router