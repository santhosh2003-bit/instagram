// const { ObjectId } = require('mongodb')
const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;

const postSchema=mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
       required:true
    },
    likes:[{
        type:ObjectId,
        ref:"userSchema"
    }],
    comments:[{
        comment:{type:String},
        postedBy:{type:ObjectId,ref:"userSchema"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"userSchema"
    },

},{timestamps:true})
module.exports=mongoose.model("postSchema",postSchema)