const getStatusCode = require('./getStatusCode');
const getErrorMessage = require('./getErrorMessage');

errorMiddleware = (err, req, res) => {
    const statusCode = getStatusCode(err);
    const message = getErrorMessage(err);

    res.status(statusCode).json({ message });
};

module.exports = errorMiddleware