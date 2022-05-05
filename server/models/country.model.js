const { getViewQuery, connect  } = require("../utils/database")
const sql = require('mssql')

class Country {
    static async getAll() {
        try {
            const result = await getViewQuery('V_COUNTRIES')
            return {status: 200, data: result[0]}

        } catch (err) {
            console.log(err)
            return {status: 500, data: err}
        }
    }
}

module.exports = Country