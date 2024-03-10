getErrorMessage = (err)=> {
    // Consider different messages for development and production environments:
    const devMode = process.env.NODE_ENV === 'development';

    if (devMode) {
        // Include error details for development
        return `Error: ${err.message}`;
    } else {
        // Provide a generic message for production
        return "Internal Server Error";
    }
}

module.exports = getErrorMessage