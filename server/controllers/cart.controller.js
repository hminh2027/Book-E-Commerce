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
        countries: rs3.data,
        user: req.user
    })
}

module.exports.getCartJSON = async (req, res) => {
    const { id } = req.user
    const rs = await Cart.getByUserId(id)

    return res.json(rs.data)
}

module.exports.insertCartDetail = async (req, res) => {
    const cartId = req.user.cart_id
    const { bookId, quantity } = req.body
    const rs = await Cart.insertCartDetail(cartId, bookId, quantity)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.updateCartDetail = async (req, res) => {
    const cartId = req.user.cart_id
    const bookId = req.params.id
    const { quantity } = req.body
    const rs = await Cart.updateCartDetail(cartId, bookId, quantity)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.deleteCartDetail = async (req, res) => {
    const cartId = req.user.cart_id
    const bookId = req.params.id
    const rs = await Cart.deleteCartDetail(cartId, bookId)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.deleteCart = async (req, res) => {
    const cartId = req.user.cart_id
    const rs = await Cart.deleteCart(cartId)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}