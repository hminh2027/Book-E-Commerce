const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Comment {
    static getById = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_COMMENTS where blog_id = @id')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }
}

module.exports = Comment