// This file defines the TodoController which manages logic for creating, reading, updating, and deleting todo items.
// It enables the creation of a RESTful API for the todo application.

const TodoSchema = require("../Models/TodoSchema");
const response = require("../Utils/responseHandler");

// what is the meaning of RESTful API?
// RESTful API (Representational State Transfer) is a design style for web services. It uses HTTP methods (GET, POST, PUT, DELETE) to perform operations on "resources" (like todos), mapped to URLs in a simple, predictable way.
exports.createTodo = async (req, res) => {
    try {
        const { taskName, description } = req.body;

        const status = req.body.status === 'true';

        const todo = await TodoSchema.create({
            taskName,
            description,
            status
        });

        if (todo) {
            return response(res, 201, "Todo created successfully", todo);
        } else {
            return response(res, 400, "Failed to create todo");
        }
    } catch (error) {
        console.error("Error creating todo:", error);
        return response(res, 500, "Internal server error");
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TodoSchema.find();
        if (tasks) {
            return response(res, 200, "All Tasks fetched Successfully", tasks);
        } else {
            return response(res, 404, "No tasks found");
        }

    } catch (error) {
        console.error("Error fetching tasks:", error);
        return response(res, 500, "Internal server error");
    }

}

exports.getParticularTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TodoSchema.findById(id);

        if (task) {
            return response(res, 200, `Your task is ${task.taskName}`, task);
        } else {
            return response(res, 404, "Task not found");
        }

    } catch (error) {
        console.error("Error fetching task:", error);
        return response(res, 500, "Internal server error");
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName, description, status } = req.body;

        const updatedTask = await TodoSchema.findByIdAndUpdate(id, {
            taskName,
            description,
            status
        }, { new: true });
        // By default, findByIdAndUpdate returns the old, unmodified document. Setting { new: true } tells Mongoose to return the updated document instead, so you can use the fresh data after update.
        if (updatedTask) {
            return response(res, 200, "Task updated successfully", updatedTask);
        } else {
            return response(res, 404, "Task not found");
        }

    } catch (error) {
        console.error("Error updating task:", error);
        return response(res, 500, "Internal server error");
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await TodoSchema.findByIdAndDelete(id);

        if (deletedTask) {
            return response(res, 200, "Task deleted successfully", deletedTask);
        } else {
            return response(res, 404, "Task not found");
        }

    } catch (error) {
        console.error("Error deleting task:", error);
        return response(res, 500, "Internal server error");
    }
}


/* 
const TodoSchema = require("../Models/TodoSchema");
const response = require("../Utils/responseHandler");

// Helper: Validate required fields on creation
function validateTodoInput({ taskName }) {
    if (!taskName || typeof taskName !== "string" || taskName.trim() === "") {
        return "Task name is required and must be a non-empty string.";
    }
    return null; // No error
}

// CREATE
exports.createTodo = async (req, res) => {
    try {
        // Input validation
        const validationError = validateTodoInput(req.body);
        if (validationError) {
            return response(res, 400, validationError);
        }

        const { taskName, description } = req.body;
        // Accept boolean or string 'true'/'false' for status
        let status = false;
        if ('status' in req.body) {
            if (typeof req.body.status === 'boolean') {
                status = req.body.status;
            } else if (typeof req.body.status === 'string') {
                status = req.body.status === 'true';
            }
        }

        const todo = await TodoSchema.create({
            taskName,
            description,
            status,
        });

        // Always check if creation was successful
        if (todo) {
            return response(res, 201, "Todo created successfully", todo);
        } else {
            return response(res, 500, "Todo creation failed");
        }
    } catch (error) {
        console.error("Error creating todo:", error);
        return response(res, 500, "Internal server error");
    }
};

// GET ALL
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TodoSchema.find();
        if (!tasks || tasks.length === 0) {
            return response(res, 404, "No tasks found");
        }
        return response(res, 200, "All tasks fetched successfully", tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return response(res, 500, "Internal server error");
    }
};

// GET BY ID
exports.getParticularTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TodoSchema.findById(id);
        if (!task) {
            return response(res, 404, "Task not found");
        }
        return response(res, 200, `Your task is: ${task.taskName}`, task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return response(res, 500, "Internal server error");
    }
};

// UPDATE
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName, description, status } = req.body;

        // Input validation (only for taskName if provided)
        if (taskName !== undefined) {
            const validationError = validateTodoInput({ taskName });
            if (validationError) {
                return response(res, 400, validationError);
            }
        }

        const updatedTask = await TodoSchema.findByIdAndUpdate(
            id,
            { taskName, description, status },
            { new: true }
        );
        if (!updatedTask) {
            return response(res, 404, "Task not found");
        }
        return response(res, 200, "Task updated successfully", updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        return response(res, 500, "Internal server error");
    }
};

// DELETE
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TodoSchema.findByIdAndDelete(id);
        if (!deletedTask) {
            return response(res, 404, "Task not found");
        }
        return response(res, 200, "Task deleted successfully", deletedTask);
    } catch (error) {
        console.error("Error deleting task:", error);
        return response(res, 500, "Internal server error");
    }
};


*/