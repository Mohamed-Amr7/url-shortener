const dotenv = require('dotenv')
const Url = require('../models/Url')

const {generateShortId} = require('./shortIds')
dotenv.config({ path: './.env' });

/**
 * @description Asynchronously fetches all URL documents from the database using the `Url.find()` method.
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<Url[]>} - A promise that resolves to an array of `Url` documents if successful.
 */
const getUrls = async () => {
    try {
        return await Url.find();
    } catch (err) {
        throw err; // Re-throw for middleware to handle
    }
};

/**
 * @description Asynchronously retrieves a specific URL document from the database based on its original URL.
 * @param {string} origUrl - The original URL to search for.
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<Url>} - A promise that resolves to the matching `Url` document if found, or `null` otherwise.
 */
const getUrlByOriginal = async (origUrl) => {
    try {
        return await Url.findOne({origUrl});
    } catch (err) {
        throw err; // Re-throw for middleware to handle
    }
};

/**
 * @description Asynchronously retrieves a specific URL document from the database based on its shortId.
 * @param {string} shortId - The shortId portion of the URL to search for.
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<Url>} - A promise that resolves to the matching `Url` document if found, or `null` otherwise.
 */
const getUrlByShortId = async (shortId) => {
    try {
        return await Url.findOne({ shortId });
    } catch (err) {
        throw err; // Re-throw for middleware to handle
    }
};

/**
* @description Asynchronously retrieves a specific URL document from the database based on its MongoDB ID.
* @param {string} id - The MongoDB ID of the URL to search for.
* @throws {Error} - Re-throws any errors encountered during the database operation.
* @returns {Promise<Url>} - A promise that resolves to the matching `Url` document if found, or `null` otherwise.
*/
const getUrlById = async (id) => {
    try {
        // Explicitly create an ObjectId instance for accurate querying
        return await Url.findOne({ _id: id });
    } catch (err) {
        throw err; // Re-throw for middleware to handle
    }
};

/**
 * @description Asynchronously creates a new URL document in the database.
 * @param {object} data - An object containing properties for the new URL document:
 *
 *   - `origUrl` (string): The original, long URL.
 *   - `base` (string): The base URL for generating the shortened URL (optional).
 *   - `shortId` (string): A unique shortId for the shortened URL (generated if not provided).
 *   - `date` (Date): The creation date (defaults to the current date).
 *   - `clicks` (number): The initial number of clicks for the shortened URL (defaults to 0).
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<Url>} - A promise that resolves to the newly created `Url` document.
 */
const createUrl = async ({origUrl, base, shortId, date = Date(), clicks = 0}) => {
    try {
        if(!shortId) shortId = await generateShortId()
        const shortUrl = `${base}/${shortId}`
        const url = new Url({
            origUrl,
            shortUrl,
            shortId,
            clicks,
            date,
        });
        await url.save()
        return url
    } catch (err) {
        throw err // Re-throw for middleware to handle
    }
}

module.exports = {
    createUrl,
    getUrls,
    getUrlByOriginal,
    getUrlByShortId,
    getUrlById,
}
