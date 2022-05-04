const bookRoute = require('./book.route')
const categoryRoute = require('./category.route')
const accountRoute = require('./account.route')
const cartRoute = require('./cart.route')

module.exports = (app) => {
    app.use('/book', bookRoute)
    app.use('/category', categoryRoute)
    app.use('/account', accountRoute)
    app.use('/cart', cartRoute)

}