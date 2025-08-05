// The purpose of this file is to define the TodoController which handles the logic for managing todo items. it includes creating, reading, updating, and deleting todo items in the database. it is used to create a RESTful API for the todo application. 

const TodoSchema = require("../Models/TodoSchema");
const response = require("../Utils/responseHandler");

// what is the meaning of RESTful API?

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

// where does request and response comes from?
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TodoSchema.find();
        if (tasks) {
            return response(res, 200, "All Tasks fetched Successfully", tasks);
        } else {
            return response(res, 400, "Failed to create todo");
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return response(res, 500, "Internal server error");
    }

}

exports.getParticularTask = async (req, res) => {
    try {
        const { id } = req.params;
        // where did req.params come from?
        const task = await TodoSchema.findById(id);

        if (task) {
            return response(res, 200, `Your task is ${task.taskName}`, task);
        } else {
            return response(res, 400, "Failed to create todo");
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
        // what is the meaning of new: true?
        if (updatedTask) {
            return response(res, 200, "Task updated successfully", updatedTask);
        } else {
            return response(res, 400, "Failed to update task");
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
            return response(res, 400, "Failed to delete task");
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        return response(res, 500, "Internal server error");
    }
}