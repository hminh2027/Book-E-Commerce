const Book = require("../models/book.model")
const Category = require("../models/category.model")

module.exports.getAllBooks = async (req, res) => {
    let rs2
    const { categoryID } = req.query
    
    if (categoryID) rs2 = await Book.getByCategoryId(categoryID)
    else rs2 = await Book.getAll()

    const rs1 = await Category.getAll()

    return res.render('shop', {
        categories: rs1.data,
        books: rs2.data
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

module.exports.getBooksByCategoryId = async (req, res) => {
    const {id} = req.params

    const rs = await Book.getByCategoryId(id)

    return res.render('shop')
}