const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' }); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use port from .env or default to 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Your application routes and middleware go here

app.listen(port, () => console.log(`Server listening on port ${port}`));