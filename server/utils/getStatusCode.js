getStatusCode = (err) => {
    if (err.name === 'ValidationError') {
        return 400; // Bad Request for validation errors
    } else if (err.name === 'MongoError') {
        if (err.code === 11000) { // Duplicate key error
            return 409; // Conflict
        } else if (err.code === 26 || err.code === 11001) { // Document not found
            return 404; // Not Found
        }
    } else {
        return 500; // Default status code for other errors
    }
}
module.exports = getStatusCode