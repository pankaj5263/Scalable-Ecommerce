// return response in json formate
const response = ({res, statusCode, message, data, token}) => {
    const responseData = {
        message: message, status: statusCode, ok: true
    }
    if (token) {
        responseData.token = token;
    }

    if(data) {
        responseData.data = data;
    }

    return res.status(statusCode).json(responseData)
}

// this function will return error object.
const errorObject = (req, message, statusCode) => {
    const errorMessage = req.t(message);
    const error = new Error(errorMessage);
    error.statusCode = statusCode || 404;
    throw error;
} 
module.exports = {
    response,
    errorObject
}