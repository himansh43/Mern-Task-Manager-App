
const express= require('express')
const router= express.Router()

const {fetchAllTodos,fetchTodoById, createTodo, updateTodo, deleteTodo}= require('../controllers/todoControllers')

router.get('/todos',fetchAllTodos)
router.get('/todos/:id',fetchTodoById)
router.post('/todos', createTodo)
router.put('/todos/:id',updateTodo)
router.delete('/todos/:id',deleteTodo)

module.exports= router