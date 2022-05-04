const express = require('express')
const exhbs = require('express-handlebars')
const cors = require('cors')
const routers = require('./routers/index')
const path = require('path')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// View engine
app.engine('.hbs', exhbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir  : [
        path.join(__dirname, 'views/partials'),
    ],
    helpers: require('./configs/handlebarHelper')
}))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))

// Routers
routers(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server started at port ' + PORT)
})