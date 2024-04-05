const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const errorMiddleware = require('./utils/errorMiddleware')
const routes = require("./routes");
const connectDB = require('./config/db')
dotenv.config();

connectDB()

const app = express();
app.use(cors({
    origin: '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(express.json())
app.use('/api',routes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8080; // Use port from .env or default to 8080

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

