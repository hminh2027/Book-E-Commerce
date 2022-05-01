const { getViewQuery } = require("../utils/dbHelper")

module.exports.getAllBooks = async (req, res) => {
    const result = await getViewQuery('V_BOOKS');
    return res.json(result)
}