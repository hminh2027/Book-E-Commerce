const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Order {
    static async getAll() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    static async insert() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    static async getByUserId(id) {
        const pool = await connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query('select * from V_ORDERS where user_id = @id')
        
        return result
    }

    update() {

    }

    delete() {

    }
}

module.exports = Order