const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class User {
    constructor() {
        
    }

    static async adminLogin(username, password) {
        const pool = await connect()
        const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .execute('SP_ADMINLOGIN')

        return result
    }

    static async customerLogin(username, password) {
        const pool = await connect()
        const result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .execute('SP_USERLOGIN')

        return result
    }

    static async getUserAddress(id) {
        const pool = await connect()
        const result = await pool.request()
        .input('id', sql.Int, id)
        .query('select * from V_ADDRESSES where user_id = @id')
        
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

module.exports = User