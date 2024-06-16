const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers:[{
        type:ObjectId,
        ref:"userSchema"
    }],

    following:[{
        type:ObjectId,
        ref:"userSchema"
    }],
    photo:{
        type:String,
        
    }

})
mongoose.model("userSchema", userSchema)