// Import the function
const isValidUrl = require('../../src/utils/urlValidator');

describe('isValidUrl', () => {
    // Test cases for valid URLs with different components
    test('correctly identifies basic valid URLs with protocols', () => {
        expect(isValidUrl('http://example.com')).toBe(true);
        expect(isValidUrl('https://example.com')).toBe(true);
    });

    test('correctly identifies valid URLs with www subdomains', () => {
        expect(isValidUrl('https://www.example.com/')).toBe(true);
        expect(isValidUrl('http://www.example.net/page?query=string')).toBe(true);
    });

    test('correctly identifies valid URLs with IPv4 addresses', () => {
        expect(isValidUrl('https://192.168.1.1')).toBe(true);
        expect(isValidUrl('https://127.0.0.1:8080/path')).toBe(true);
        expect(isValidUrl('https://192.568.1.1')).toBe(false);
        expect(isValidUrl('https://127.500.0.1:8080/path')).toBe(false);
    });

    test('correctly identifies valid URLs with paths, query strings, and fragments', () => {
        expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
        expect(isValidUrl('https://example.com/?query=string')).toBe(true);
        expect(isValidUrl('https://example.com/page#anchor')).toBe(true);
        expect(isValidUrl('https://example.com/path?query=string#anchor')).toBe(true);
    });

});