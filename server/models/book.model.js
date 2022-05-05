const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Book {

    static async getAll() {
        try {
            const result = await getViewQuery('V_BOOKS')
            return {status: 200, data: result[0]}

        } catch (e) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static async getById(id) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_BOOKS where id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static async getByCategoryId(id) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_BOOKS where category_id = @id')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

}

module.exports = Book