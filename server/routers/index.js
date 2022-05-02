const bookRoute = require('./book.route')
const categoryRoute = require('./category.route')

module.exports = (app) => {
    app.use('/api/book', bookRoute)
    app.use('/api/category', categoryRoute)
}