const express = require("express")
const router = express.Router()
const allRouter = require('./all')
const shortRouter = require('./short')

router.use(allRouter)
router.use(shortRouter)

module.exports = router