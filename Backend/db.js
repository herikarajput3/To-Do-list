const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Failed to connect with database", err))

module.exports = mongoose;