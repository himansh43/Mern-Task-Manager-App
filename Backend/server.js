const express= require('express')
const app= express()
require('dotenv').config()
const PORT= process.env.PORT
const cors= require('cors')
const bodyParser= require('body-parser')

const mongoose= require('mongoose')
const mongoDbUrl=process.env.MONGO_DB_URL
mongoose.connect(mongoDbUrl).then(()=>{console.log(`MongoDb connected`)}).catch((error)=>{console.log('MongoDb disconected',error)})
const todoRoutes= require('./routes/todoRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use('/todos',todoRoutes)
app.listen(PORT,()=>{
    console.log(`server started at PORT:${PORT}`)
})