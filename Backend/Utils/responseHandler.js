const response = (res, statusCode, message, data = null) => {
    if (!res) {
        throw new Error("Response object is required");
    }

    const responseData = {
        status: statusCode < 400 ? "success" : "error",
        message,
        data
    };

    return res.status(statusCode).json(responseData);

}

module.exports = response;
