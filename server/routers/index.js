const bookRoute = require('./book.route')
const categoryRoute = require('./category.route')
const accountRoute = require('./account.route')
const cartRoute = require('./cart.route')
const homeRoute = require('./home.route')
const adminRoute = require('./admin.route')

module.exports = (app) => {
    app.use('/book', bookRoute)
    app.use('/category', categoryRoute)
    app.use('/account', accountRoute)
    app.use('/cart', cartRoute)
    app.use('/admin', adminRoute)
    app.use('/', homeRoute)
}