const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//anothe way to get the schema 
//const userSchema=require('../model/model.js')
const userSchema = mongoose.model('userSchema')
//importing json(javascript object notaion ) web token
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../key')
require('../middleware/response')
router.get('/hello', (req, res) => {
    res.send("hello this is code")
})
/*
router.post('/signup',async(req,res)=>{
    const {name,userName,email,password}=req.body;
    const exist=await userSchema.findOne({email})
    if(exist){
        return res.json({message:"user already exist"})
    }
const user= new userSchema({
name,
userName,
email,
password
})
await user.save()
return res.json( await userSchema.find())
})

*/

router.post('/signup', (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: "fill all fields" })
    }
    userSchema.findOne({ $or: [{ email: email }, { name: name }] }).then((r) => {
        if (r) {
            return res.status(422).json({ error: "User already exist" })
        }
        bcrypt.hash(password, 12).then((hashpassword) => {
            const user = new userSchema({
                name,
                userName,
                email,
                password: hashpassword
            })
            user.save()
                .then(() => { res.json({ message: "Register  Successfull!" }) }).catch((err) => { console.log("error occured") })
        })
    })


})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: "Fill all Fields" })
    }
    userSchema.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email" })
        }
        bcrypt.compare(password, savedUser.password).then((use_data) => {
            //this compare will provide a boolean value
            if (use_data) {
                // return res.status(200).json({message:"Signin Successfull"})
                //here create a token with help of the jsonwebtoken module
                const token = jwt.sign({ _id: savedUser.id }, jwt_key)
                //now store the user id and name and userName in the local storage then you have to return it
                const {_id,name,userName}=savedUser;
                //console.log({token,user:{_id,name,userName}})
                 res.json({token,user:{_id,name,userName}})
                //return res.send(use_data)  here it provide true if the user enter correct creadentails

            }
            else {
                return res.status(422).json({ error: "Invalid Password" })
            }
        })
    })
})

// router.get('/createpost',resonse,(req,res)=>{//in response file if you dont use next parameter this below statement cannot execute
//   // console.log("its is cretapost")
// })
//warning create a new file for this method in router
module.exports = router