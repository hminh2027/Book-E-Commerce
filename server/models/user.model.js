const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class User {
    static async adminLogin(username, password) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .execute('SP_ADMINLOGIN')
    
            return {status: 200, data: result}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static async customerLogin(username, password) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .execute('SP_USERLOGIN')
    
            return {status: 200, data: result}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        } 
    }

    static async getUserAddress(id) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_ADDRESSES where user_id = @id')
            
            return {status: 200, data: result}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static async signup(firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country) {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('first_name', sql.NVarChar, firstName)
            .input('last_name', sql.NVarChar, lastName)
            .input('company_name', sql.NVarChar, companyName)
            .input('email', sql.NVarChar, email)
            .input('phone', sql.NVarChar, phone)
            .input('country', sql.Int, country)
            .input('address', sql.NVarChar, address)
            .input('city', sql.NVarChar, city)
            .input('state', sql.NVarChar, state)
            .input('postcode', sql.NVarChar, postcode)
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .output('ErrorMessage', sql.NvarChar)
            .execute('SP_SIGNUP')
    
            return {status: 200, data: result}

        } catch (err) {
            return {status: 500, data: err}
        }
    }
}

module.exports = User