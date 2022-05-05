const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Order {
    static async getAll() {
        try {
            const result = await getViewQuery('V_BOOKS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static async getByUserId(id) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_ORDERS where user_id = @id')
            
            return {status: 200, data: result}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Order