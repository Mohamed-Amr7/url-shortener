const mongoose = require("mongoose");

// Schema for storing URL shortening information
const UrlSchema = new mongoose.Schema({
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
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