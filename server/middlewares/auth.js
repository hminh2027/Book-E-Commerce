const jwt = require('jsonwebtoken')
const { getCookie } = require('../utils/cookie')
require('dotenv').config()

module.exports = async (req, res, next) => {
    const token = getCookie('token', req.headers.cookie)

    if(!token) return res.status(401).json({msg:'Access denied. No token provided'})

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({msg:'Invalid token! Please refresh page or relogin'})
    }
}

