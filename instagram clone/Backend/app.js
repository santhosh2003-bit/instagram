/*

const http=require('http');
const server=http.createServer((req,res)=>{
    res.end("hello baby");
})
server.listen(5001,"localhost",()=>console.log("Server Running..."))

*/



//import the express
const express=require("express")
//call the express function it will return an object
const app=express();
app.listen(5001,()=>console.log("Server Running..."))
//import the mongoose 
const mongoose=require('mongoose')
const cors=require('cors')
//import the mongoose url from ./key.js file
const {mongoose_key} =require('./key')
app.use(express.json())
app.use(cors({origin:"*"}))
//import the Schema path
require('../Backend/model/model')
require('../Backend/model/post')
app.use(require('./router/auth'))
app.use(require('./router/createpost'))
app.use(require('./router/user'))
//connect the mongoose with the help of the connect() method
mongoose.connect(mongoose_key)//.then(()=>console.log("Db connected"))
//check weather mongoose connected or not 
mongoose.connection.on('connected',()=>{
    console.log("Database Connected Successfull")
})//if the connection failed then it will return this error

mongoose.connection.on("error",()=>{
    console.log("Error Occured during Db connecting")
})


