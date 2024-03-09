const mongoose = require('mongoose')
const dotenv = require("dotenv")
const request = require('supertest');
const express = require("express");
const routes = require("../../src/routes");
const errorMiddleware = require("../../src/utils/errorMiddleware");
const {createUrl, getUrlById} = require("../../src/handlers/urls");


describe('URL Shortener E2E Tests', () => {
    let app
    let baseUrl
    beforeAll(async () => {
        dotenv.config({path: './.env'}) // Load environment variables

        // Prioritize connecting to the test database (TEST_MONGODB_URI) if available,
        // otherwise connect to the primary MongoDB (MONGODB_URI).
        if (process.env.TEST_MONGODB_URI) {
            await mongoose.connect(process.env.TEST_MONGODB_URI, {
                useNewUrlParser: true, useUnifiedTopology: true
            })
                .then(() => console.log('Connected to Test MongoDB'))
                .catch(err => console.error('Error connecting to Test MongoDB:', err));
        } else {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true, useUnifiedTopology: true
            })
                .then(() => console.log('Connected to MongoDB'))
                .catch(err => console.error('Error connecting to MongoDB:', err));
        }
        baseUrl = process.env.APP_URL
        app = express();

        app.use(express.json())
        app.use(routes)
        app.use(errorMiddleware)
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });


    it('should create a shortened URL with a POST request to /short and return 201 Created', async () => {
        const origUrl = 'https://www.test.com/';
        const response = await request(app)
            .post('/short')
            .send({ origUrl });
        expect(response.statusCode).toBe(201); // Expect Created status code
        expect(response.body.data).toHaveProperty('shortUrl'); // Verify shortUrl exists
        expect(response.body.data.shortUrl).toContain(`${process.env.APP_URL}/`); // Check base URL presence
        expect(response.body.data.origUrl).toBe(origUrl);

        const createdUrl = await getUrlById(response.body.data._id)
        await createdUrl.delete();
    });

    it('should return 200 OK and existing URL for duplicate creation', async () => {
        const origUrl = 'https://www.example2.com/';

        // Create the original URL first
        const createdUrl = await createUrl({ origUrl,base: baseUrl });

        // Send a POST request to create the same URL again
        const response = await request(app)
            .post('/short')
            .send({ origUrl });

        expect(response.statusCode).toBe(200); // Expect OK status code

        // Expect the response to contain the existing URL data
        expect(response.body.data).toMatchObject({
            origUrl,
            shortUrl: createdUrl.shortUrl,
            hash: createdUrl.hash,
            clicks: createdUrl.clicks,
        });

        await createdUrl.delete();
    });

    it('should return all shortened URLs with a GET request to /all', async () => {
        // Create some test URLs
        const url1 = await createUrl({ origUrl: 'https://www.google.com/',base: baseUrl });
        const url2 = await createUrl({ origUrl: 'https://www.youtube.com/' ,base: baseUrl});

        const response = await request(app).get('/all');

        expect(response.statusCode).toBe(200); // Expect OK status code
        expect(response.body.data).toBeInstanceOf(Array); // Expect an array response

        response.body.data.forEach(url => {
            expect(url).toHaveProperty('origUrl');
            expect(url).toHaveProperty('shortUrl');
        });
        await url1.delete()
        await url2.delete()
    });

    it('should redirect to the original URL with a GET request to /:hash', async () => {
        const origUrl = 'https://www.test.com/';
        const createdUrl = await createUrl({ origUrl ,base: baseUrl});
        const hash = createdUrl.hash;
        const response = await request(app).get(`/${hash}`);

        expect(response.statusCode).toBe(302); // Expect Found status code
        expect(response.headers.location).toBe(origUrl); // Verify redirection

        await createdUrl.delete();
    });


})

