const todoModel= require('../models/todoModel')

const createTodo= async(req,res)=>{
try {
    const {todoName,isDone}= req.body
    const todo= new todoModel({todoName,isDone})
    const newTodo= await todo.save()
    res.status(201).json({message:"Todo Created Successfully", success:true, newTodo:newTodo})
} catch (error) {
    res.status(500).json({message:"Internal Server Error", success:false, error:error})
}
}


const fetchAllTodos= async(req,res)=>{
try {
    const todos= await todoModel.find({}).sort({"createdAt": -1})
    res.status(200).json({message:"Successfully fetched All todos", success:true, todos:todos})
} catch (error) {
    res.status(500).json({message:"Internal Server Error", success:false, error:error})
}
}

const fetchTodoById=async(req,res)=>{
    try {
        const id= req.params.id
        const todo= await todoModel.findById(id)
        res.status(200).json({message:"successfully fetched Todo by Id", success:true, todo:todo})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", success:false, error:error})
    }
}

const updateTodo=async(req,res)=>{
    try {
        const id= req.params.id
        console.log("update id is",id)
        const body= req.body
        const obj = { $set: { ...body } };

        const updateTodo= await todoModel.findByIdAndUpdate(id,obj)
        res.status(200).json({message:"successfully update Todo", success:true, updateTodo:updateTodo, new:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", success:false, error:error})
    }
}

const deleteTodo=async(req,res)=>{
    try {
        const id= req.params.id
        console.log("is is",id)
        const deleteTodo= await todoModel.findByIdAndDelete(id)
        const todo= await todoModel.find().sort({"createdAt": -1})
        res.status(200).json({message:"successfully delete Todo", success:true, deletedTodo:deleteTodo,allTodos:todo})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", success:false, error:error})
    
    }
}

module.exports= {
    createTodo, fetchAllTodos ,fetchTodoById,updateTodo,deleteTodo
}