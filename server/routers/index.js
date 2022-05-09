const bookRoute = require('./book.route')
const categoryRoute = require('./category.route')
const accountRoute = require('./account.route')
const cartRoute = require('./cart.route')
const homeRoute = require('./home.route')
const adminRoute = require('./admin.route')
const couponRoute = require('./coupon.route')
const orderRoute = require('./order.route')

module.exports = (app) => {
    app.use('/book', bookRoute)
    app.use('/category', categoryRoute)
    app.use('/account', accountRoute)
    app.use('/cart', cartRoute)
    app.use('/admin', adminRoute)
    app.use('/coupon', couponRoute)
    app.use('/order', orderRoute)
    app.use('/', homeRoute)
}