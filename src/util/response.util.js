const sendResponse = (res, statusCode, success, message, data = null) => {
    const responseObj = { success, message };
    if (data !== null) {
        responseObj.data = data;
    }
    return res.status(statusCode).json(responseObj);
};

module.exports = { sendResponse };