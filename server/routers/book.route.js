const express = require('express')
const router = express.Router()
const sql = require('mssql')
require('dotenv').config()
const bookController = require('../controllers/book.controller')

router.get('/', bookController.getAllBooks)

module.exports = router