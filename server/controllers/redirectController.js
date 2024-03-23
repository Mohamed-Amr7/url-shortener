const {getUrlByShortId} = require("../utils/urlHelpers");

/**
 * Handles the logic for redirecting to the original URL associated with a given shortId.
 * @async
 * @function redirectToOrigUrl
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<*>} - A Promise that resolves when the response is sent or an error is caught.
 */
async function redirectToOrigUrl(req, res, next) {
    try {
        const url = await getUrlByShortId(req.params.shortId);
        if (url) {
            url.clicks++;
            url.save();
            return res.json({ url: url.origUrl });
        } else return res.status(404).json("Not found");
    } catch (err) {
        next();
    }
}

module.exports = redirectToOrigUrl
