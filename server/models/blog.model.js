const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Blog {

    static getAll = async () => {
        try {
            const result = await getViewQuery('V_BLOGS')
            return {status: 200, data: result[0]}

        } catch (e) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static getById = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_BLOGS where id = @id')
            
            return {status: 200, data: result.recordset[0]}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }
        
    }

    static getByTagId = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('select * from V_TAG_BLOGS where tag_id = @id')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }    
    }

    static getByTitle = async (title) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('title', sql.NVarChar, '%' + title + '%')
            .query('select * from V_BLOGS where title like @title')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }    
    }

    // INSERT
    static insertBlog = async (categoryId, title, image, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('category_id', sql.Int, categoryId)
            .input('title', sql.NVarChar, title)
            .input('image', sql.NVarChar, image)
            .input('quantity', sql.Int, quantity)
            .input('price_in', sql.Money, priceIn)
            .input('price_out', sql.Money, priceOut)
            .input('sale', sql.Int, sale)
            .input('skucode', sql.NVarChar, skucode)
            .input('short_desc', sql.NVarChar, shortDescription)
            .input('long_desc', sql.NVarChar, longDescription)
            .execute('SP_INSERT_BLOG')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static updateBlog = async (id, categoryId, title, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .input('category_id', sql.Int, categoryId)
            .input('title', sql.NVarChar, title)
            .input('quantity', sql.Int, quantity)
            .input('price_in', sql.Money, priceIn)
            .input('price_out', sql.Money, priceOut)
            .input('sale', sql.Int, sale)
            .input('skucode', sql.NVarChar, skucode)
            .input('short_desc', sql.NVarChar, shortDescription)
            .input('long_desc', sql.NVarChar, longDescription)
            .execute('SP_UPDATE_BLOG')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Updated Fail!'}
            return {status: 200, data: 'Updated Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Blog