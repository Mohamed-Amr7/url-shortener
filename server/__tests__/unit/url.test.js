const mongoose = require('mongoose')
const Url = require('../../models/Url')
const {getUrls, getUrlByShortId, getUrlByOriginal, createUrl, getUrlById} = require('../../utils/urlHelpers');

jest.mock('../../models/Url');

describe("Url controllers' Tests", () => {

    test('getUrls successfully retrieves all URLs', async () => {
        const mockUrls = [
            {
                "_id": 1,
                "origUrl": "https://www.example.com/",
                "shortUrl": "http://127.0.0.1:5000/abc123",
                "shortId": "abc123",
                "clicks": 0,
                "date": "2024-03-05",
            },
            {
                "_id": 2,
                "origUrl": "https://www.example.net/",
                "shortUrl": "http://127.0.0.1:5000/abcdef",
                "shortId": "abcdef",
                "clicks": 0,
                "date": "2020-02-10",
            }
        ];
        Url.find.mockResolvedValueOnce(mockUrls);

        const urls = await getUrls();

        expect(Url.find).toHaveBeenCalledTimes(1);
        expect(urls).toEqual(mockUrls);
    });

    test('getUrlByOriginal retrieves a URL by its original URL', async () => {
        const mockUrl = {
            "_id": 1,
            "origUrl": "https://www.example.com/",
            "shortUrl": "http://127.0.0.1:5000/abc123",
            "shortId": "abc123",
            "clicks": 0,
            "date": "2024-03-05",
        };
        Url.findOne.mockResolvedValueOnce(mockUrl);

        const url = await getUrlByOriginal('https://example.com');

        expect(Url.findOne).toHaveBeenCalledWith({origUrl: 'https://example.com'});
        expect(url).toEqual(mockUrl);
    });

    test('getUrlByShortId retrieves a URL by its shortId', async () => {
        const mockUrl = {
            "_id": 1,
            "origUrl": "https://www.example.com/",
            "shortUrl": "http://127.0.0.1:5000/abc123",
            "shortId": "abc123",
            "clicks": 0,
            "date": "2024-03-05",
        }
        Url.findOne.mockResolvedValueOnce(mockUrl);

        const url = await getUrlByShortId('abc123');

        expect(Url.findOne).toHaveBeenCalledWith({shortId: 'abc123'});
        expect(url).toEqual(mockUrl);
    });

    test('getUrlByshortId retrieves a URL by its MongoDB ObjectID', async () => {
        const mockObjectId = new mongoose.Types.ObjectId();
        const mockUrl = {
            _id: mockObjectId,
            origUrl: "https://www.example.com/",
            shortUrl: "http://127.0.0.1:5000/abc123",
            shortId: "abc123",
            clicks: 0,
            date: "2022-08-02",
        };
        Url.findOne.mockResolvedValueOnce(mockUrl);

        const url = await getUrlById(mockObjectId.toString())

        expect(Url.findOne).toHaveBeenCalledWith({_id: mockObjectId.toString()})
        expect(url).toEqual(mockUrl)
    });

    test('createUrl successfully creates a new URL document with expected properties', async () => {

        await createUrl({
            origUrl: 'https://example.org',
            base: 'https://shortener',
            shortId: 'abc123',
        });

        expect(Url).toHaveBeenCalledWith({
            origUrl: 'https://example.org',
            shortUrl: 'https://shortener/abc123',
            shortId: 'abc123',
            date: Date(),
            clicks: 0
        })
    });

    test('Create a new Url entry with missing required field', async () => {
        Url.mockImplementationOnce(() => {
            throw new Error('Missing required fields: origUrl, shortId');
        });

        try {
            await createUrl({shortUrl: 'abc123'});
        } catch (error) {
            expect(error.message).toEqual('Missing required fields: origUrl, shortId');
        }
    })
})

