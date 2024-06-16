/*

const jwt=require("jsonwebtoken");
const {jwt_key}=require("../key");
const mongoose=require("mongoose")
const userSchema =mongoose.model("userSchema")

module.exports=(req,res,next)=>{
    const {authencation}=req.headers;
    if(!authencation){
        return res.status(401).send("Login first")
    }
const token=authencation.replace("Bearer","")
jwt.verify(token,jwt_key,(err,payload)=>{
    if(err){
        return res.status(401).send("first Login")
    }
    const {_id}=payload;
    userSchema.findById(_id).then((userdata)=>{
        console.log(userdata)
    })
})

//console.log("hello middleware")
next();//this only execute above statement after remaining statement are not execute thats why we use this next method
}

*/

const jwt = require("jsonwebtoken");
const { jwt_key } = require("../key");
const mongoose = require("mongoose");
const userSchema = mongoose.model("userSchema");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({error:"Login first"});
    }
    //const token = authorization  
    //it is also work
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwt_key, (err, payload) => {
        if (err) {
            return res.status(401).json({error:"first Login"});
        }
        const { _id } = payload;
        userSchema.findById(_id).then((userdata) => {
           
           req.user=userdata;
           next();
        })
    });
   
};
