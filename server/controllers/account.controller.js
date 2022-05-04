const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.getLogin = async (req, res) => {
    
    return res.render('login')
}

module.exports.getSignup = async (req, res) => {

    return res.render('signup')
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    const result = await User.customerLogin(username, password)
    
    console.log(result)
    const accessToken = jwt.sign(result.recordset[0], process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}