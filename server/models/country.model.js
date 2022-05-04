const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Country {
    constructor() {
        
    }

    static async getAll() {
        const result = await getViewQuery('V_COUNTRIES')
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

module.exports = Country