const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Book {

    static getAll = async () => {
        try {
            const result = await getViewQuery('V_BOOKS')
            return {status: 200, data: result[0]}

        } catch (e) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getFeaturedBooks = async () => {
        try {
            const result = await getViewQuery('V_FEATURED_BOOKS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getOnSaleBooks = async () => {
        try {
            const result = await getViewQuery('V_ONSALE_BOOKS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getTopSellerBooks = async () => {
        try {
            const result = await getViewQuery('V_BESTSELLER_BOOKS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getNewBooks = async () => {
        try {
            const result = await getViewQuery('V_NEW_BOOKS')
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
            .query('select * from V_BOOKS where id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static getByCategoryId = async (id) => {
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

    // INSERT
    static insertBook = async () => {
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