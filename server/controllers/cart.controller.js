const Cart = require("../models/cart.model")

module.exports.getCart = async (req, res) => {
    const { id } = req.user
    console.log(id)
    const result = await Cart.getAll(id)
    console.log(result)
    return res.render('login')
}
