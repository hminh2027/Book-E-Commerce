const { connect  } = require("../utils/database")
const sql = require('mssql')

class Coupon {
    static getByCode = async (code) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('code', sql.NVarChar, code)
            .query('select * from V_COUPONS where code = @code')
            
            return {status: 200, data: result.recordset[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Coupon