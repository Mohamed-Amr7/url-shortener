const express = require("express")
const router = express.Router()

const validateUrl = require('../utils/urlValidator')
const {createUrl, getUrl} = require('../handlers/urls')

router.post("/short", async (req, res, next) => {
    const {origUrl} = req.body;
    const base = process.env.APP_URL; // Base URL (e.g., 'https://localhost:3000')

    if (validateUrl(origUrl)) {
        try {
            let url = await getUrl(origUrl);
            if (url) {
                res.status(200).json({
                    message: "Existing short URL found",
                    data: url
                })
            } else {
                url = await createUrl({origUrl, base})
                res.status(201).json({
                    message: "Short URL created successfully",
                    data: url
                })
            }
        } catch (err) {
            next(err)
        }
    } else {
        res.status(400).json('Invalid Url')
    }
});

module.exports = router
