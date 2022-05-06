const User = require("../models/user.model")

const jwt = require('jsonwebtoken')

const { validateEmail } = require("../utils/validate")
const { getCookie } = require('../utils/cookie')

require('dotenv').config()

module.exports.getAdminPage = async (req, res) => {
    
    return res.render('admin-home')
}

module.exports.getLogin = async (req, res) => {
    const token = getCookie('token', req.headers.cookie)

    if (token) return res.redirect(req.baseUrl)
    return res.render('admin-login')
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({msg:'Missing information!'})

    const rs = await User.adminLogin(username, password)

    if (rs.status === 500) return res.status(500).json({msg: rs.data})
    
    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}