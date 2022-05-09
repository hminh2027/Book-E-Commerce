const Book = require("../models/book.model")
const Category = require("../models/category.model")

module.exports.getAllBooks = async (req, res) => {
    let rs2
    const { categoryID } = req.query

   categoryID ? rs2 = await Book.getByCategoryId(categoryID) : rs2 = await Book.getAll()

    const rs1 = await Category.getAll()
    const rs3 = await Book.getFeaturedBooks()

    // Pagination
    const page = req.query.page || 1
    const limit = 8
    const pageCount = Math.ceil(rs2.data.length / limit)
    const books = rs2.data.slice(page * limit - limit, page * limit)

    return res.render('shop', {
        categories: rs1.data,
        books,
        featuredBooks: rs3.data,
        pageCount
    })
}

module.exports.getBookById = async (req, res) => {
    const {id} = req.params

    const rs1 = await Book.getById(id)
    const rs2 = await Book.getByCategoryId(rs1.data.category_id)

    return res.render('product-details', {
        book: rs1.data,
        relatedBooks: rs2.data
    })
}

module.exports.createBook = async (req, res) => {

    return res.status(200).send('c')
}