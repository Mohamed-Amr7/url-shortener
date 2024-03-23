const {getUrls} = require('../utils/urlHelpers')

/**
 * Handles the logic for retrieving all saved URLs from the database.
 * @async
 * @function getAllUrls
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<*>} - A Promise that resolves when the response is sent or an error is caught.
 */
async function getAllUrls(req, res, next) {
    try {
        const data = await getUrls()
        res.status(200).json({ message: "Successfully retrieved all URLs",data });
    } catch (err) {
        return next(err)
    }
}

module.exports = getAllUrls
