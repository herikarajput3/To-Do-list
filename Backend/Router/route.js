const { createTodo, getAllTasks, getParticularTask, updateTask, deleteTask } = require('../Controllers/TodoController');

const router = require('express').Router();
require('../db')

router.post('/createTask', createTodo);
router.get('/getAllTasks', getAllTasks);
router.get('/getParticularTask/:id', getParticularTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;