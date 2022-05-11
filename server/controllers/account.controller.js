const User = require("../models/user.model")
const Country = require("../models/country.model")
const Order = require("../models/order.model")

const jwt = require('jsonwebtoken')

const { validateEmail } = require("../utils/validate")
const { getCookie } = require('../utils/cookie')

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
    const token = getCookie('token', req.headers.cookie)

    if (token) return res.redirect('/account')
    return res.render('login')
}

module.exports.getSignup = async (req, res) => {
    const token = getCookie('token', req.headers.cookie)

    if (token) return res.redirect('/account')
    
    const rs = await Country.getAll()
    return res.render('signup', {countries: rs.data})
}

module.exports.updateUser = async (req, res) => {
    const { username } = req.user
    const { firstName, lastName, email, country, companyName, phone, curPassword, newPassword } = req.body
    if (!username || !curPassword || !newPassword || !firstName || !lastName || !email || !country || !phone) return res.status(400).json({msg:'Missing information!'})

    const check = await User.customerLogin(username, curPassword)

    if(check.status === 500) return res.status(500).json({msg: 'Current password is not correct!'})

    const rs = await User.updateUser(firstName, lastName, email, country, companyName, phone, username, newPassword)
    
    if (rs.status === 500) return res.status(500).json({msg: rs.data.originalError.info.message})
    
    return res.status(200).json({ msg: rs.data })
}

module.exports.updateUserAddress = async (req, res) => {
    const { id } = req.user
    const { city, address, state, postcode } = req.body
    if (!city || !address || !state || !postcode) return res.status(400).json({msg:'Missing information!'})

    const rs = await User.updateUserAddress(id, city, address, state, postcode)
    
    if (rs.status === 500) return res.status(500).json({msg: rs.data.originalError.info.message})
    
    return res.status(200).json({ msg: rs.data })
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({msg:'Missing information!'})

    const rs = await User.customerLogin(username, password)

    if (rs.status === 500) return res.status(500).json({msg: rs.data})
    
    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '30d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}

module.exports.postSignup = async (req, res) => {
    const { firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country } = req.body

    if (!username || !password || !firstName || !lastName || !email || !country || !phone || !address || !city || !state || !postcode) return res.status(400).json({msg:'Missing information!'})
    if(!validateEmail(email)) return res.status(400).json({msg:'Email is invalid!'})
    if(await (await User.checkUserExist(username)).data > 0) return res.status(400).json({msg:'Username has been taken!'})

    const rs = await User.signup(firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country)
    
    if (rs.status === 500) return res.status(500).json({msg: rs.data.originalError.info.message})

    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '30d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })

}

module.exports.deleteUser = async (req, res) => {
    const {id} = req.params

    const rs = await User.deleteUser(id)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}