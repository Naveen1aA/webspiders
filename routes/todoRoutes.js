const express = require('express');
const todoController = require('../controllers/todoController')

const router = express.Router();


//All CRUD Routes
router.post('/', todoController.createTask);
router.get('/', todoController.getTasks);
router.get('/:id', todoController.getTaskById);
router.put('/:id', todoController.updateTask);
router.delete('/:id', todoController.deleteTask);

module.exports = router;
