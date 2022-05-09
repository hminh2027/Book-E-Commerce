const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller')
const auth = require('../middlewares/customerAuth')

router.get('/orderDetail/:id', auth, orderController.getOrderDetail)

router.post('/', auth, orderController.insertOrder)
router.post('/orderDetail', auth, orderController.insertOrderDetail)

module.exports = router