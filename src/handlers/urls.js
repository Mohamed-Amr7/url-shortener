const Url = require('../models/Url')

/**
 * This function retrieves all saved URLs from the database and returns them as an array.
 *
 * Expected Behavior:
 *  - Attempts to retrieve all saved URLs from the database using an asynchronous operation
 *  - If successful (no error encountered), returns the retrieved URLs as an array.
 *  - If an error occurs during retrieval, re-throws the error for handling by middleware.
 *
 * @example
 * ```javascript
 * router.get("/all", async (req, res) => {
 *   try {
 *     const data = await Url.find();
 *     res.status(200).json({ message: "Successfully retrieved all URLs", data });
 *   } catch (error) {
 *     console.error(error);
 *     res.status(500).json({ message: "Internal Server Error" });
 *   }
 * });
 * ```
 **/

const getUrls = async () => {
    try {
        return await Url.find();
    } catch (err) {
        throw err; // Re-throw for middleware to handle
    }
};

module.exports = getUrls
