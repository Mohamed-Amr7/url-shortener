getStatusCode = (err)=> {
    if (err.name === 'ValidationError') {
        return 400; // Bad Request for validation errors
    } else if (err.name === 'MongoError') {
        return 500; // Internal Server Error for database errors
    } else {
        return 500; // Default status code for other errors
    }
}
module.exports = getStatusCode