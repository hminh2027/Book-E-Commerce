const { getViewQuery  } = require("../utils/database")

class Category {
    static getAll= async () => {
        try {
            const result = await getViewQuery('V_CATEGORIES')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Category