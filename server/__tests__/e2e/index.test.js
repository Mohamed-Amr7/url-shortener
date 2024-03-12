const mongoose = require('mongoose')
const dotenv = require("dotenv")
const request = require('supertest');
const express = require("express");
const routes = require("../../routes");
const connectDB = require('../../config/db')
const errorMiddleware = require("../../utils/errorMiddleware");
const {createUrl, getUrlById} = require("../../handlers/urls");


describe('URL Shortener E2E Tests', () => {
    let app
    let baseUrl
    beforeAll(async () => {
        dotenv.config({path: '../.env'}) // Load environment variables
        try {
            await connectDB(process.env.TEST_MONGODB_URI)
        }
        catch (err){
            process.exit()
        }

        baseUrl = process.env.APP_URL
        app = express();

        app.use(express.json())
        app.use('/api',routes)
        app.use(errorMiddleware)
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });


    it('should create a shortened URL with a POST request to /api/short and return 201 Created', async () => {
        const origUrl = 'https://www.test.com/';
        const response = await request(app)
            .post('/api/short')
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
            .post('/api/short')
            .send({ origUrl });

        expect(response.statusCode).toBe(200); // Expect OK status code

        // Expect the response to contain the existing URL data
        expect(response.body.data).toMatchObject({
            origUrl,
            shortUrl: createdUrl.shortUrl,
            shortId: createdUrl.shortId,
            clicks: createdUrl.clicks,
        });

        await createdUrl.delete();
    });

    it('should return all shortened URLs with a GET request to /api/all', async () => {
        // Create some test URLs
        const url1 = await createUrl({ origUrl: 'https://www.google.com/',base: baseUrl });
        const url2 = await createUrl({ origUrl: 'https://www.youtube.com/' ,base: baseUrl});

        const response = await request(app).get('/api/all');

        expect(response.statusCode).toBe(200); // Expect OK status code
        expect(response.body.data).toBeInstanceOf(Array); // Expect an array response

        response.body.data.forEach(url => {
            expect(url).toHaveProperty('origUrl');
            expect(url).toHaveProperty('shortUrl');
        });
        await url1.delete()
        await url2.delete()
    });

    it('should redirect to the original URL with a GET request to /api/:shortId', async () => {
        const origUrl = 'https://www.test.com/';
        const createdUrl = await createUrl({ origUrl ,base: baseUrl});
        const shortId = createdUrl.shortId;
        const response = await request(app).get(`/api/${shortId}`);

        expect(response.statusCode).toBe(302); // Expect Found status code
        expect(response.headers.location).toBe(origUrl); // Verify redirection

        await createdUrl.delete();
    });


})

