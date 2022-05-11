const { connect, getViewQuery } = require("../utils/database")
const md5 = require('md5')

const sql = require('mssql')

class User {
    static getAll = async () => {
        try {
            const result = await getViewQuery('V_USERS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getById = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_USERS where id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static adminLogin = async (username, password) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, md5(password))
            .execute('SP_ADMIN_LOGIN')

            if(!result.recordset[0]) return {status: 500, data: 'Wrong username/password'}
    
            return {status: 200, data: result.recordset[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static customerLogin = async (username, password) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, md5(password))
            .execute('SP_USERLOGIN')

            if(!result.recordset[0]) return {status: 500, data: 'Wrong username/password'}
    
            return {status: 200, data: result.recordset[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        } 
    }

    static updateUser = async (firstName, lastName, email, country, companyName, phone, username, password) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('first_name', sql.NVarChar, firstName)
            .input('last_name', sql.NVarChar, lastName)
            .input('company_name', sql.NVarChar, companyName)
            .input('email', sql.NVarChar, email)
            .input('country', sql.Int, country)
            .input('phone', sql.NVarChar, phone)
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, md5(password))
            .execute('SP_UPDATE_USER')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Updated Fail!'}
            return {status: 200, data: 'Updated Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static insertUserAddress = async (userId, city, address, state, postcode) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('city', sql.NVarChar, city)
            .input('address', sql.NVarChar, address)
            .input('user_id', sql.Int, userId)
            .input('state', sql.NVarChar, state)
            .input('postcode', sql.NVarChar, postcode)
            .execute('SP_INSERT_USER_ADDRESS')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static updateUserAddress = async (userId, city, address, state, postcode) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('city', sql.NVarChar, city)
            .input('address', sql.NVarChar, address)
            .input('user_id', sql.Int, userId)
            .input('state', sql.NVarChar, state)
            .input('postcode', sql.NVarChar, postcode)
            .execute('SP_UPDATE_USER_ADDRESS')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Updated Fail!'}
            return {status: 200, data: 'Updated Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static getUserAddress = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_ADDRESSES where user_id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static checkUserExist = async (username) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('select * from USERS where username = @username')
    
            return {status: 200, data: result.rowsAffected[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }  
    }

    static signup = async (firstName, lastName, email, password, companyName, phone, address, city, state, postcode, username, country) => {
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
            .input('password', sql.NVarChar, md5(password))
            .execute('SP_SIGNUP')
    
            return {status: 200, data: result}

        } catch (err) {
            
            return {status: 500, data: err}
        }
    }

    static deleteUser = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('SP_DELETE_USER')
    
            return {status: 200, data: result}

        } catch (err) {
            
            return {status: 500, data: err}
        }
    }
}

module.exports = User