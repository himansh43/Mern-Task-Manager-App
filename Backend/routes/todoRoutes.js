
const express= require('express')
const router= express.Router()

const {fetchAllTodos,fetchTodoById, createTodo, updateTodo, deleteTodo}= require('../controllers/todoControllers')

router.get('/',fetchAllTodos)
router.get('/:id',fetchTodoById)
router.post('/', createTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

module.exports= router