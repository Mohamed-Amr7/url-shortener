const express = require("express")
const router = express.Router()
const all = require('../controllers/allController')

router.get("/all", all);

module.exports = router