const express = require("express")
const router = express.Router()
const redirect = require('../controllers/redirectController')

router.get("/:shortId", redirect);
module.exports = router