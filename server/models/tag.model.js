const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Tag {
    static getAll= async () => {
        try {
            const result = await getViewQuery('V_TAGS')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getByBlogId = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_BLOG_TAGS where blog_id = @id')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }
}

module.exports = Tag