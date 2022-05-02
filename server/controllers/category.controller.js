const { getViewQuery } = require("../utils/dbHelper")

module.exports.getAllCategories = async (req, res) => {
    const result = await getViewQuery('V_CATEGORIES');
    return res.status(200).json(result)
}