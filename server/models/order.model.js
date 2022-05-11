const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Order {
    static getAll = async () => {
        try {
            const result = await getViewQuery('V_ORDERS')
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
            .query('select * from V_ORDERS where id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getDetailById = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_ORDER_DETAILS where order_id = @id')
            
            return {status: 200, data: result.recordset}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getTodayOrdersCount = async () => {
        try {
            const result = await getViewQuery('V_TODAY_ORDERS')
            return {status: 200, data: result[0][0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getMonthlyRevenue = async () => {
        try {
            const result = await getViewQuery('V_MONTHLY_REVENUE')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getTotalProfit = async () => {
        try {
            const result = await getViewQuery('V_TOTAL_PROFIT')
            return {status: 200, data: result[0][0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getTopCustomer = async () => {
        try {
            const result = await getViewQuery('V_TOP_CUSTOMER')
            return {status: 200, data: result[0][0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getByUserId = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_ORDERS where userID = @id')
            
            return {status: 200, data: result.recordset}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static insertOrder = async (shippingId, couponId, userId, note) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('shipping_id', sql.Int, shippingId)
            .input('coupon_id', sql.Int, couponId)
            .input('user_id', sql.Int, userId)
            .input('note', sql.NVarChar, note)
            .execute('SP_INSERT_ORDER')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static insertOrderDetail = async (bookId, quantity, price) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('book_id', sql.Int, bookId)
            .input('quantity', sql.Int, quantity)
            .input('price', sql.Money, price)
            .execute('SP_INSERT_ORDER_DETAIL')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Order