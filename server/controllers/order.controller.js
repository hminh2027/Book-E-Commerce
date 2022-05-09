const Coupon = require("../models/coupon.model")
const Order = require("../models/order.model")

module.exports.getOrderDetail = async (req, res) => {

    const { id } = req.params

    const rs = await Order.getById(id)
    const rs2 = await Order.getDetailById(id)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).render('order-detail', {
        order: rs.data,
        orderDetails: rs2.data
    })
}

module.exports.insertOrder = async (req, res) => {
    const userId = req.user.id
    const { shippingId, countryId, coupon, note } = req.body

    const rs1 = await Coupon.getByCode(coupon)

    const rs = await Order.insertOrder(shippingId, countryId, rs1.id, userId, note)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.insertOrderDetail = async (req, res) => {
    const { bookId, quantity, price } = req.body
    
    const rs = await Order.insertOrderDetail(bookId, quantity, price)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}