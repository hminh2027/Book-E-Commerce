const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Shipping {
    constructor() {
        
    }

    static async getAll() {
        const result = await getViewQuery('V_SHIPPINGS')
        return result
    }

    static async insert() {
        const result = await getViewQuery('V_BOOKS')
        return result
    }

    

    update() {

    }

    delete() {

    }
}

module.exports = Shipping