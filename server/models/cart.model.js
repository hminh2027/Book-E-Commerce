const { connect  } = require("../utils/database")
const sql = require('mssql')

class Cart {
    static getByUserId = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('SP_GETCARTBYID')
            return {status: 200, data: result.recordset}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static insertCartDetail = async (cartId, bookId, quantity) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('cart_id', sql.Int, cartId)
            .input('book_id', sql.Int, bookId)
            .input('quantity', sql.Int, quantity)
            .execute('SP_INSERT_CART_DETAIL')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static updateCartDetail = async (cartId, bookId, quantity) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('cart_id', sql.Int, cartId)
            .input('book_id', sql.Int, bookId)
            .input('quantity', sql.Int, quantity)
            .execute('SP_UPDATE_CART_DETAIL')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Updated Fail!'}
            return {status: 200, data: 'Updated Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static deleteCartDetail = async (cartId, bookId) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('cart_id', sql.Int, cartId)
            .input('book_id', sql.Int, bookId)
            .execute('SP_DELETE_CART_DETAIL')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Deleted Fail!'}
            return {status: 200, data: 'Deleted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static deleteCart = async (cartId) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('cart_id', sql.Int, cartId)
            .execute('SP_DELETE_CART')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Deleted Fail!'}
            return {status: 200, data: 'Deleted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Cart