const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Cart {
    static async getByUserId(id) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('SP_GETCARTBYID')
            return result.recordset

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static async insert() {
        try {
            const result = await getViewQuery('V_BOOKS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }    
    }

}

module.exports = Cart