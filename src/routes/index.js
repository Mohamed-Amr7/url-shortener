const express = require("express")
const router = express.Router()
const allRouter = require('./all')
const shortRouter = require('./short')
const redirectRouter = require('./redirect')

router.use(allRouter)
router.use(shortRouter)
router.use(redirectRouter)

module.exports = router