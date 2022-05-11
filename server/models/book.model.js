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

    static getByTitle = async (title) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('title', sql.NVarChar, '%' + title + '%')
            .query('select * from V_BOOKS where title like @title')
            
            return {status: 200, data: result.recordset}

        } catch(err) {
            console.log(err)
            return {status: 500, data: err}
        }    
    }

    // INSERT
    static insertBook = async (categoryId, title, image, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription) => {
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
            .execute('SP_INSERT_BOOK')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Inserted Fail!'}
            return {status: 200, data: 'Inserted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static updateBook = async (id, categoryId, title, quantity, priceIn, priceOut, sale, skucode, shortDescription, longDescription) => {
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
            .execute('SP_UPDATE_BOOK')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Updated Fail!'}
            return {status: 200, data: 'Updated Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }

    static deleteBook = async (id) => {
        try {
            const pool = await connect()
            const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('SP_DELETE_BOOK')

            if(result.rowsAffected[0] === 0) return {status: 500, data: 'Deleted Fail!'}
            return {status: 200, data: 'Deleted Successful!'}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Book