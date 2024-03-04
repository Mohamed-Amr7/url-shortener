const express = require("express")
const getUrls = require('src/handlers/urls')
const router = express.Router()

/**
 * This function retrieves all saved URLs from the database and sends them as a JSON response to the client.
 *
 * Route: GET /all
 *
 * Expected Behavior:
 *  - Upon receiving a GET request to `/all`, the function calls the `getUrls` function to retrieve the data asynchronously.
 *  - If successful, the function sends a JSON response containing the retrieved URLs with a status code of 200 (OK).
 *  - If an error occurs during retrieval (either in `getUrls` or within this function), the error is caught and passed to middleware for centralized handling.
 *
 **/
router.get("/all", async (req, res,next) => {
    try {
        const data = await getUrls();
        return res.status(200).json({ message: "Successfully retrieved all URLs",data });
    } catch (err) {
       return next(err)
    }
});

module.exports = router