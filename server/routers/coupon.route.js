const express = require('express')
const router = express.Router()

const couponController = require('../controllers/coupon.controller')

router.get('/:code', couponController.getCouponByCode)

module.exports = router