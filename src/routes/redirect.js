const express = require("express")
const {getUrlByHash} = require("../handlers/urls");
const router = express.Router()

router.get("/:hash", async (req, res,next) => {
    try {
        const url = await getUrlByHash(req.params.hash)
        if (url) {
            url.clicks++;
            url.save();
            return res.redirect(url.origUrl);
        } else res.status(404).json("Not found");
    } catch (err) {
        next()
    }
});

module.exports = router