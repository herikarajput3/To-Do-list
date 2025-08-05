const response = (res, statusCode, message, data = null) => {
    if (!res) throw new Error("Response object is required");

    if (statusCode < 400) {
        return res.status(statusCode).json({ status: "success", message, data });
    } else {
        return res.status(statusCode).json({ status: "error", message, error: data });
    }
};

module.exports = response;
