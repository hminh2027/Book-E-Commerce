const Book = require("../models/book.model")
const Category = require("../models/category.model")

module.exports.getHome = async (req, res) => {
    const rs1 = await Book.getFeaturedBooks()
    const rs2 = await Book.getOnSaleBooks()
    const rs3 = await Book.getTopSellerBooks()
    const rs4 = await Book.getNewBooks()

    return res.render('home', {
        featuredBooks: rs1.data,
        onsaleBooks: rs2.data,
        topsellerBooks: rs3.data,
        newBooks: rs4.data
    })
}