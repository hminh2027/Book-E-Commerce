const Cart = require("../models/cart.model")
const Shipping = require("../models/shipping.model")
const Country = require("../models/country.model")

module.exports.getCart = async (req, res) => {
    const { id } = req.user
    const rs = await Cart.getByUserId(id)
    return res.render('cart', {books: rs.data})
}

module.exports.getCheckout = async (req, res) => {
    const { id } = req.user
    const rs = await Cart.getByUserId(id)
    const rs2 = await Shipping.getAll()
    const rs3 = await Country.getAll()

    return res.render('checkout', {
        books: rs.data,
        shippings: rs2.data,
        countries: rs3.data
    })
}

module.exports.getCartJSON = async (req, res) => {
    const { id } = req.user
    const rs = await Cart.getByUserId(id)
    return res.json(rs.data)
}