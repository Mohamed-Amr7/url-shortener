const mongoose = require("mongoose");

/**
 * Mongoose schema for a URL document.
 *
 * @typedef {Object} Url
 * @property {string} origUrl - The original, long URL. (Required)
 * @property {string} shortUrl - The shortened version of the original URL. (Required)
 * @property {string} shortId - A unique shortId used to identify the shortened URL. (Required)
 * @property {number} clicks - The number of times the shortened URL has been clicked. (Default: 0)
 * @property {Date} date - The date and time the URL document was created. (Default: current date/time)
 */
const UrlSchema = new mongoose.Schema({
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    shortId:{
        type: String,
        required : true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Url", UrlSchema);