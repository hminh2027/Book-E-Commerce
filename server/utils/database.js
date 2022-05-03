const sql = require('mssql')
require('dotenv').config()

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: 'localhost',
    pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
    },
    options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const connect = async () => {
    try {
        const pool = await sql.connect(sqlConfig)
        return pool

    } catch (err) {
        console.log(err)
    }
}

const getViewQuery = async (view) => {
    const pool = await connect()
    const result = await (await pool).query(`select * from ${view}`)
    return result.recordsets
}

// const createRequest = async () => {
//     return new sql.Request()
// }

// const execProc = async (id) => {
//     const pool = connect()
//     const request = new sql.Request()
//     request.input('Category', sql.Int, id)
//     const result = await request.execute('SP_GETBOOKSBYCATEGORY')
//     return result.recordsets
// }

module.exports = { getViewQuery, connect }