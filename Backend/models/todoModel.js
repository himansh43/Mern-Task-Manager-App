const mongoose= require('mongoose')
const todoSchema= new mongoose.Schema({
    todoName:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const todoModel= new mongoose.model('todo',todoSchema)

module.exports= todoModel