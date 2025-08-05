// The schema defines the structure of to-do list items and how the data will be stored in the database.
// We use it to add fields like task name, description, status, created date, etc.


const { Schema, model } = require("mongoose");

const todoSchema = Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
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