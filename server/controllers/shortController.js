const validateUrl = require('../utils/urlValidator')
const {createUrl, getUrlByOriginal} = require('../utils/urlHelpers')

/**
 * Handles the logic for creating or retrieving a shortened URL.
 * @async
 * @function shortenUrl
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
async function shortenUrl(req, res, next) {
    const {origUrl} = req.body;
    const base = process.env.CLIENT_BASE_URL; // Base URL (e.g., 'https://localhost:3000')

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
}

module.exports = shortenUrl
