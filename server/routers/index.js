const bookRoute = require('./book.route')

module.exports = (app) => {
    app.use('/api/book', bookRoute)
}