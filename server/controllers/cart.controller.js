const Cart = require("../models/cart.model")
const Shipping = require("../models/shipping.model")
const Country = require("../models/country.model")

module.exports.getCart = async (req, res) => {
    const { id } = req.user
    const result = await Cart.getAll(id)
    return res.render('cart', {books: result.recordset})
}

module.exports.getCheckout = async (req, res) => {
    const { id } = req.user
    const result = await Cart.getAll(id)
    const result2 = await Shipping.getAll()
    const result3 = await Country.getAll()
    return res.render('checkout', {
        books: result.recordset,
        shippings: result2[0],
        countries: result3[0]
    })
}
