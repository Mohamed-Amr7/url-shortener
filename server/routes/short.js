const express = require("express")
const router = express.Router()

const validateUrl = require('../utils/urlValidator')
const {createUrl, getUrlByOriginal} = require('../handlers/urls')

/**
 * ### This route handler creates or retrieves a shortened URL.
 *
 * ### Route: POST /short
 *
 * Expected Request Body:
 *  - `origUrl`: The original URL to be shortened.
 *
 * Expected Behavior:
 *  1. Validates the provided `origUrl`.
 *  2. **If valid:**
 *      Attempts to retrieve an existing shortened URL for `origUrl` using the `getUrl` function.
 <ul>
 <li>If an existing URL is found:</li>
 <li>Responds with a 200 status code and a JSON object containing the message "Existing short URL found" and the data for the shortened URL.</li>
 <li>If no existing URL is found:</li>
 <li>Creates a new shortened URL using the `createUrl` function, including the original URL and the base URL from the environment variable `APP_URL`.</li>
 <li>Responds with a 201 status code and a JSON object containing the message "Short URL created successfully" and the data for the newly created shortened URL.</li>
 </ul>
 *  3. **If the `origUrl` is invalid:**
 *     Responds with a 400 status code and a JSON message "Invalid Url".
 *  4. Catches any errors during the process and passes them to the next middleware for handling.
 *
 **/
router.post("/short", async (req, res, next) => {
    const {origUrl} = req.body;
    const base = process.env.APP_URL; // Base URL (e.g., 'https://localhost:3000')

    if (validateUrl(origUrl)) {
        try {
            let url = await getUrlByOriginal(origUrl);
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
