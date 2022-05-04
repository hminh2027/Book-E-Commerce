const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Cart {
    constructor() {
        
    }

    static async getAll(id) {
        const pool = await connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .execute('SP_GETCARTBYID')
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

module.exports = Cart