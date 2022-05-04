const User = require("../models/user.model")
const Country = require("../models/country.model")
const jwt = require('jsonwebtoken')
const Order = require("../models/order.model")
require('dotenv').config()

module.exports.getMyAccount = async (req, res) => {
    const result = await User.getUserAddress(req.user.id)
    const result2 = await Country.getAll()
    const result3 = await Order.getByUserId(req.user.id)

    return res.render('my-account', {
        user: req.user,
        address: result.recordset[0],
        countries: result2[0],
        orders: result3.recordset
    })
}

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