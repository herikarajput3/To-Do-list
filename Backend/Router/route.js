const { createTodo, getAllTasks, getParticularTask, updateTask, deleteTask } = require('../Controllers/TodoController');

const router = require('express').Router();
require('../db');

router.post('/tasks', createTodo);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getParticularTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
