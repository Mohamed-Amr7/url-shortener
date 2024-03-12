const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const errorMiddleware = require('./utils/errorMiddleware')
const routes = require("./routes");
const connectDB = require('./config/db')
dotenv.config({ path: './.env' }); // Load environment variables


connectDB()

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api',routes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

