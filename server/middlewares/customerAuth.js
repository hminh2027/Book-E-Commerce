const jwt = require('jsonwebtoken')
const { getCookie } = require('../utils/cookie')
require('dotenv').config()

module.exports = async (req, res, next) => {
    const token = getCookie('token', req.headers.cookie)

    if(!token) return res.redirect('/account/login')

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        req.user = decoded
        if(req.user.role !== 'customer') return res.redirect('/admin')
        next()
    } catch (err) {
        console.log(err)
        return res.redirect('/account/login')
    }
}