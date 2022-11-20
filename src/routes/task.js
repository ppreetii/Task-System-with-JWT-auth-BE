
const express = require('express');

const taskController = require('../controllers/task');
const isAuthorised = require("../middlewares/auth")

const router = express.Router();

router.get('/tasks', isAuthorised, taskController.getAllTasks);

router.get('/tasks/:taskId', isAuthorised, taskController.getTask);

router.post('/add-task', isAuthorised , taskController.createTask);

router.put('/edit-task/:taskId', isAuthorised , taskController.updateTask);

router.delete('/delete-task/:taskId', isAuthorised , taskController.deleteTask);

module.exports = router;