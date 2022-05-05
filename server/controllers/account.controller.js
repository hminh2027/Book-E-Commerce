const User = require("../models/user.model")
const Country = require("../models/country.model")
const jwt = require('jsonwebtoken')
const Order = require("../models/order.model")
require('dotenv').config()

module.exports.getMyAccount = async (req, res) => {
    const rs1 = await User.getUserAddress(req.user.id)
    const rs2 = await Country.getAll()
    const rs3 = await Order.getByUserId(req.user.id)

    return res.render('my-account', {
        user: req.user,
        address: rs1.data,
        countries: rs2.data,
        orders: rs3.data
    })
}

module.exports.getLogin = async (req, res) => { 
    return res.render('login')
}

module.exports.getSignup = async (req, res) => {
    const rs = await Country.getAll()
    return res.render('signup', {countries: rs.data})
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    const rs = await User.customerLogin(username, password)
    
    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}

module.exports.postSignup = async (req, res) => {
    const { firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country } = req.body

    const rs = await User.signup(firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country)
    
    console.log(rs)
    
    return res.status(200).json({
        msg: 'Hi'
    })
}