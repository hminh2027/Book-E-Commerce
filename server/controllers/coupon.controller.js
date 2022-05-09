const Coupon = require("../models/coupon.model")

module.exports.getCouponByCode = async (req, res) => {
    const { code } = req.params
    
    const rs = await Coupon.getByCode(code)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}