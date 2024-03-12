const Url = require("../models/Url");
const {generate} = require("shortid");

/**
 * @description Asynchronously checks if a given shortId is already present in the database.
 * @param {string} shortId - The unique shortId to check for.
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the shortId exists, `false` otherwise.
 */
const isUniqueShortId = async (shortId)=>{
    const base = process.env.APP_URL
    let url = `${base}/${shortId}`
    let found = await Url.findOne({shortUrl : url})
    return !!found;
}

/**
 * @description Asynchronously generates a unique shortId for a shortened URL.
 * @throws {Error} - Re-throws any errors encountered during shortId generation or database operations.
 * @returns {Promise<string>} - A promise that resolves to a unique shortId string.
 */
const generateShortId = async () => {
    let shortId
    let found
    try {
        do {
            const fullId = await generate()
            shortId = fullId.replace(/[^\w\d]/g, "").substring(0,7)
            found = await isUniqueShortId(shortId).then((flag)=> flag)
        }
        while (shortId.length < 5 || found)
        return shortId
    }
    catch (err){
        throw err
    }
}

module.exports = {generateShortId}