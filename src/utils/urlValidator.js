/**
 * Checks if the provided input is a valid URL.

 * @param {string} inputUrl - The URL string to be validated.

 * @returns {boolean} True if the input is a valid URL, false otherwise.

 * @throws {TypeError} - If the input is not a string.

 * @example
 * ```javascript
 * const isValid = isValidUrl('https://www.example.com');
 * console.log(isValid); // Output: true
 *
 * const isInvalid = isValidUrl('not a url');
 * console.log(isInvalid); // Output: false
 *
 * try {
 *   isValidUrl(123); // This will throw a TypeError
 * } catch (error) {
 *   console.error(error.message); // Output: isValidUrl: url must be a string
 * }
 * ```
 */
function isValidUrl(inputUrl) {
    if (typeof inputUrl !== 'string') {
        throw new TypeError('isValidUrl: url must be a string');
    }
    try {
        new URL(inputUrl);
        return true
    } catch (err) {
        return false
    }
}

module.exports = isValidUrl;
