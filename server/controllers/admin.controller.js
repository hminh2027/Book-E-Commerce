const User = require("../models/user.model")
const Category = require("../models/category.model")
const Book = require("../models/book.model")
const jwt = require('jsonwebtoken')

const { getCookie } = require('../utils/cookie')
const Order = require("../models/order.model")


require('dotenv').config()

module.exports.getAdminPage = async (req, res) => {
    
    return res.render('admin/home', {layout: 'admin'})
}

module.exports.getLogin = async (req, res) => {
    const token = getCookie('token', req.headers.cookie)

    if (token) return res.redirect(req.baseUrl)
    return res.render('admin/login')
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({msg:'Missing information!'})

    const rs = await User.adminLogin(username, password)

    if (rs.status === 500) return res.status(500).json({msg: rs.data})
    
    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '30d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}

module.exports.getBooks = async (req, res) => {
    let rs2
    const minPrice = req.query.minPrice || 0
    const maxPrice = req.query.maxPrice || 999999
    const { categoryID } = req.query

   categoryID ? rs2 = await Book.getByCategoryId(categoryID) : rs2 = await Book.getAll()

    const rs1 = await Category.getAll()

    // Filter by price range
    let books = rs2.data.filter(book => book.price > minPrice && book.price < maxPrice)

    // Pagination
    const page = req.query.page || 1
    const limit = 8
    const pageCount = Math.ceil(rs2.data.length / limit)
    books = books.slice(page * limit - limit, page * limit)

    return res.render('admin/book', {
        layout: 'admin',
        categories: rs1.data,
        books,
        pageCount
    })
}

module.exports.getOrders = async (req, res) => {
    const rs = await Order.getAll()

    // Pagination
    const page = req.query.page || 1
    const limit = 8
    const pageCount = Math.ceil(rs.data.length / limit)
    orders = rs.data.slice(page * limit - limit, page * limit)

    return res.render('admin/order', {
        layout: 'admin',
        orders,
        pageCount
    })
}

module.exports.getBookById = async (req, res) => {
    const {id} = req.params

    const rs = await Category.getAll()
    const rs1 = await Book.getById(id)

    return res.render('admin/book-detail', {
        layout: 'admin',
        categories: rs.data,
        book: rs1.data,
    })
}


module.exports.getOrderById = async (req, res) => {
    const {id} = req.params

    const rs = await Order.getById(id)
    const rs1 = await Order.getDetailById(id)
    const rs2 = await User.getUserAddress(rs.data.userID)

    return res.render('admin/order-detail', {
        layout: 'admin',
        order: rs.data,
        books: rs1.data,
        address: rs2.data
    })
}

module.exports.getBookCreate = async (req, res) => {
    const rs = await Category.getAll()

    return res.render('admin/book-detail', {
        layout: 'admin',
        categories: rs.data
    })
}

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({msg:'Missing information!'})

    const rs = await User.adminLogin(username, password)

    if (rs.status === 500) return res.status(500).json({msg: rs.data})
    
    const accessToken = jwt.sign(rs.data, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d'
    })

    return res.status(200).json({
        msg: 'Success',
        token: accessToken
    })
}