const mongoose = require("mongoose");
require("dotenv").config({path: '../.env'});
const db = process.env.MONGODB_URI;
mongoose.set("strictQuery", true, "useNewUrlParser", true, "useUnifiedTopology", true);

/**
 * Connects to the MongoDB database specified by the provided URL or the `MONGODB_URI` environment variable.
 *
 * @param {string} dbUrl (optional) - The URL to connect to the MongoDB database.
 *   If not provided, it will attempt to connect to the URL configured in the .env file
 *   using the `MONGODB_URI` environment variable.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */

const connectDB = async (dbUrl = db) => {
    await mongoose.connect(dbUrl)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
};

module.exports = connectDB;