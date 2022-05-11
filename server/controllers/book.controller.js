const Book = require("../models/book.model")
const Category = require("../models/category.model")

const {cloudinary} = require('../utils/cloudinary')

module.exports.getAllBooks = async (req, res) => {
    let rs2
    const minPrice = req.query.minPrice || 0
    const maxPrice = req.query.maxPrice || 999999
    const { categoryID, search } = req.query

   if (categoryID) rs2 = await Book.getByCategoryId(categoryID)  
   else if (search) rs2 = await Book.getByTitle(search)  
   else rs2 = await Book.getAll()

    const rs1 = await Category.getAll()
    const rs3 = await Book.getFeaturedBooks()

    // Filter by price range
    let books = rs2.data.filter(book => book.price > minPrice && book.price < maxPrice)

    // Pagination
    const page = req.query.page || 1
    const limit = 8
    const pageCount = Math.ceil(rs2.data.length / limit)
    books = books.slice(page * limit - limit, page * limit)

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

module.exports.insertBook = async (req, res) => {
    const { categoryId, title, image, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription } = req.body

    const uploadRs = await cloudinary.uploader.upload(image, {
        upload_preset: 'books'
    })

    const rs = await Book.insertBook(categoryId, title, uploadRs.url, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.updateBook = async (req, res) => {
    const {id} = req.params
    const { categoryId, title, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription } = req.body

    const rs = await Book.updateBook(id, categoryId, title, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}

module.exports.deleteBook = async (req, res) => {
    const {id} = req.params

    const rs = await Book.deleteBook(id)

    if (rs.status === 500) return res.status(500).json({ msg: rs.data })

    return res.status(200).json({ msg: rs.data })
}