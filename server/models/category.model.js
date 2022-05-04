const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Category {
    constructor(category_id, title, price_in, price_out, sale, quantity, sku_code, short_description, long_description) {
        
    }

    static async getAll() {
        const result = await getViewQuery('V_CATEGORIES')
        return result
    }

    static async insert() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    

    update() {

    }

    delete() {

    }
}

module.exports = Category