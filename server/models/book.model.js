const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Book {
    constructor(category_id, title, price_in, price_out, sale, quantity, sku_code, short_description, long_description) {
        
    }

    static async getAll() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    static async insert() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    static async getById(id) {
        const pool = await connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query('select * from V_BOOKS where id = @id')
        
        return result
    }

    static async getByCategories(id) {
        const pool = await connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query('select * from V_BOOKS where category_id = @id')
        
        return result
    }

    update() {

    }

    delete() {

    }
}

module.exports = Book