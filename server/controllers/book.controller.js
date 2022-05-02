const { getViewQuery, createRequest, execProc } = require("../utils/dbHelper")

module.exports.getAllBooks = async (req, res) => {
    const result = await getViewQuery('V_BOOKS');
    // return res.status(200).json(result)
    return res.render('home')
}

module.exports.getBooksByCategory = async (req, res) => {
    console.log(req.params.category)
    console.log(await execProc(req.params.category))

    return res.status(200).send('c')
}