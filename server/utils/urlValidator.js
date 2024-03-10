/**
 * Checks if the provided input is a valid URL.
 *
 * @param {string} inputUrl - The URL string to be validated.
 *
 * @returns {boolean} True if the input is a valid URL, false otherwise.
 *
 * @example
 * ```javascript
 * const isValid = isValidUrl('https://www.example.com');
 * console.log(isValid); // Output: true
 *
 * const isInvalid = isValidUrl('not a url');
 * console.log(isInvalid); // Output: false
 *
 * ```
 */
function isValidUrl(inputUrl) {
    try {
        new URL(inputUrl);
        return true
    } catch (err) {
        return false
    }
}

module.exports = isValidUrl;
