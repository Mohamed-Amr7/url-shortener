getErrorMessage = (err)=> {
    const isDevelopment = process.env.NODE_ENV === 'development';
    // Include detailed error message in development, provide generic message in production
    return isDevelopment ? `Error: ${err.message}` : "Internal Server Error";
}

module.exports = getErrorMessage