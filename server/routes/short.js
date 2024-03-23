const express = require("express")
const router = express.Router()
const short = require('../controllers/shortController')

router.post("/short", short);

module.exports = router
