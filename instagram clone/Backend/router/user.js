const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const response = require('../middleware/response');

const userSchema = mongoose.model('userSchema');
const postSchema = mongoose.model('postSchema');

router.get('/profile/:userid', (req, res) => {
    userSchema.findOne({ _id: req.params.userid })
        .select("-password")
        .then((user) => {

            //  res.json(user)
            postSchema.find({ postedBy: req.params.userid })
                .populate("postedBy", "_id ")
                .then((post) => {

                    res.json({ user, post })
                })
                .catch((err) => res.json({error:"inside Error"}))
        })
        .catch((err) => res.json({error:"Outside error"}))
})


//add follow and unfollow concept
router.put('/follow',response,(req,res)=>{
    userSchema.findByIdAndUpdate(req.body.followId,
       {
        $push:{followers:req.user._id}
       },
    {
        new:true
    }   ).then((re)=>console.log(re))
       userSchema.findByIdAndUpdate(req.user._id,{
       $push:{following:req.body.followId}
       },{
        new:true
       }
       ).then((result)=>{
        res.json(result)
       })
       .catch((err)=>res.json(err))
    })
    //unfollow
router.put('/unfollow',response,(req,res)=>{
    userSchema.findByIdAndUpdate(req.body.followId,
       {
        $pull:{followers:req.user._id}
       },
    {
        new:true
    }   ).then((re)=>console.log(re))
       userSchema.findByIdAndUpdate(req.user._id,{
       $pull:{following:req.body.followId}
       },{
        new:true
       }
       ).then((result)=>{
        res.json(result)
       })
       .catch((err)=>res.json(err))
    })
//this router is used to your following users posts come here
    router.get('/myfollowpost',response,(req,res)=>{
        postSchema.find({postedBy:{$in:req.user.following}})
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .then((data)=>res.json(data))
        .catch((err)=>console.log(err))
    })

    router.put("/uploadprofile",response,(req,res)=>{
        userSchema.findByIdAndUpdate(req.user._id,{
            $set:{photo:req.body.pic}
        },{
            new:true
        }).then((result)=>{
           res.json(result)
        })
        .catch((err)=>console.log(err))
    })

module.exports = router;