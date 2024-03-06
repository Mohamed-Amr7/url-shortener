const Url = require("../models/Url");
const {generate} = require("shortid");

/**
 * Asynchronously checks if a given hash is already present in the database.
 *
 * @param {string} hash - The unique hash to check for.
 * @throws {Error} - Re-throws any errors encountered during the database operation.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the hash exists, `false` otherwise.
 */
const isUniqueHash = async (hash)=>{
    const base = process.env.APP_URL
    let url = `${base}/${hash}`
    let found = await Url.findOne({shortUrl : url})
    return !!found;
}

/**
 * Asynchronously generates a unique hash for a shortened URL.
 *
 * @throws {Error} - Re-throws any errors encountered during hash generation or database operations.
 * @returns {Promise<string>} - A promise that resolves to a unique hash string.
 */
const generateHash = async () => {
    let hash
    try {
        do {
            hash = generate()
        }
        while (await isUniqueHash(hash))
        return hash
    }
    catch (err){
        throw err
    }
}

module.exports = {generateHash}