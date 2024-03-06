const express = require("express")
const {getUrlByHash} = require("../handlers/urls");
const router = express.Router()

/**
 * ### Route: GET /:hash
 *
 * Asynchronously handles GET requests to the "/:hash" endpoint.
 * This endpoint retrieves a URL document from the database based on the provided hash and redirects the user to the original URL if found.
 *
 * Expected Behavior:
 *
 * - Retrieves the URL document based on the hash parameter in the request path.
 *
 * **If a matching URL document is found:**
 <ul>
 <li>Increments the click count for the URL document.</li>
 <li>Saves the updated URL document to the database.</li>
 <li>Redirects the user to the original URL (`origUrl`) stored in the document.</li>
 </ul>
 *
 * **If no matching URL document is found:**
 <ul>
 <li>Sends a 404 Not Found response with a JSON message.</li>
 </ul>
 * **If any errors occur during the process (database operations, etc.)**
 <ul>
 <li>the error is re-thrown for middleware to handle centrally.</li>
 </ul>
 *
 **/
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