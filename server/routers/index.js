const bookRoute = require('./book.route')
const categoryRoute = require('./category.route')

module.exports = (app) => {
    app.use('/book', bookRoute)
    app.use('/category', categoryRoute)
}