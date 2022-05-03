const Book = require("../models/book.model")

module.exports.getAllBooks = async (req, res) => {
    // const book = new Book()
    console.log(await Book.insert())
    return res.render('home')
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

module.exports.getBooksByCategory = async (req, res) => {
    console.log(req.params.category)
    // console.log(await execProc(req.params.category))

    return res.status(200).send('c')
}