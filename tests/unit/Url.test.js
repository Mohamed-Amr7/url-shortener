const mongoose = require('mongoose')
const Url = require('../../src/models/Url');
const dotenv = require("dotenv");
dotenv.config({path: './.env'}); // Load environment variables


// Prioritize connecting to the test database (TEST_MONGODB_URI) if available,
// otherwise connect to the primary MongoDB (MONGODB_URI).
if (process.env.TEST_MONGODB_URI) {
    mongoose.connect(process.env.TEST_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to Test MongoDB'))
        .catch(err => console.error('Error connecting to Test MongoDB:', err));
} else {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
}

test('Create a new Url entry with valid data', async () => {
    const url = new Url({
        origUrl: 'https://www.example.com/',
        shortUrl: 'abc123',
    });
    await url.save();
    expect(url.isNew).toBeFalsy(); // Ensure the document is saved successfully
    expect(url.origUrl).toBe('https://www.example.com/');
    expect(url.shortUrl).toBe('abc123');
    expect(url.clicks).toBe(0); // Default value
    expect(url.date).not.toBeNull(); // Date should be set

    await url.delete();
});
test('Create a new Url entry with missing required field', async () => {
    const url = new Url({shortUrl: 'abc123'}); // Missing "origUrl"
    await expect(url.save()).rejects.toThrowError();
});

