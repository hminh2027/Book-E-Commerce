const express = require('express')
const cors = require('cors')
const routers = require('./routers/index')
const path = require('path')
const app = express()

// Middleware
app.use(cors())

// View engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routers
routers(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log('Server started at port ' + PORT)
})