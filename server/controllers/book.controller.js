const Book = require("../models/book.model")
const Category = require("../models/category.model")

module.exports.getAllBooks = async (req, res) => {
    const categories = await Category.getAll()
    const books = await Book.getAll()

    return res.render('shop', {
        categories: categories[0],
        books: books[0]
    })
}

module.exports.tryPost = async (req, res) => {
    
    return res.render('admin-home')
}

module.exports.getBookById = async (req, res) => {
    const {id} = req.params

    const result1 = await Book.getById(id)
    const result2 = await Book.getByCategories(result1.recordset[0].category_id)

    console.log(result2)

    return res.render('product-details', {
        book: result1.recordset[0],
        relatedBooks: result2.recordset
    })
}

module.exports.createBook = async (req, res) => {
   
    console.log(req.body)
    return res.status(200).send('c')
}

module.exports.getBooksByCategory = async (req, res) => {
    console.log(req.params.category)
    // console.log(await execProc(req.params.category))

    return res.status(200).send('c')
}