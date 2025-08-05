// Purpose of schema file is to give structure how our todo list looks like and how data will store into database also we use it to add features in our app like status, created date, task name, description, etc

const { Schema, model } = require("mongoose");

const todoSchema = Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        // enum: [completed, pending],
        default: false
    }
}, { timestamps: true });

module.exports = model("Todo", todoSchema);