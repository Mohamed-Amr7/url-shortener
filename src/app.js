const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorMiddleware = require('./utils/errorMiddleware')
const routes = require("./routes/index");
dotenv.config({ path: './.env' }); // Load environment variables


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

