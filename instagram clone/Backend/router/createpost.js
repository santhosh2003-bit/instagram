const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const response = require('../middleware/response');
const postSchema = mongoose.model("postSchema")

router.get('/allposts', response, (req, res) => {
    postSchema.find()
        .populate("postedBy", "_id name photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then((post => res.json(post)))
        .catch((err) => console.log(err))
})


router.post('/createpost', response, (req, res) => {
    const { body, photo } = req.body
    if (!body || !photo) {
        return res.status(422).json({ error: "please Add All fields" })
    }
    //console.log(req.user)
    const newpost = new postSchema({
        body,
        photo: photo,
        postedBy: req.user
    })
    newpost.save().then((post_data) => {
        return res.json({ post: post_data })
    }).catch((err) => {
        return res.json(err)
    })
})

router.get('/myposts', response, (req, res) => {
    postSchema.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .sort("-createdAt")
        .then((data) => res.json(data))
})

// likes update router
router.put('/likes', response, (req, res) => {
    postSchema.findByIdAndUpdate(req.body.postId, {//here we have to pass the user post id from front end  for uniquly identify the post
        $push: { likes: req.user._id }//here we have to pass _id of the user when user click a like actions that will push into the like array
    }, {
        new: true
    })
    .populate("postedBy", "_id name photo")
    .then((result) => {
        return res.json(result)
    })
        .catch((err) => res.status(422).json({ error: "Post Not found" }))
});

// unlike router

router.put('/unlikes', response, (req, res) => {
    postSchema.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "_id name photo")
    .then((result) => {
        return res.json(result)
    })
        .catch((err) => res.status(422).json({ error: "Post Not found" }))
})



//comment router 

router.put('/comments', response, (req, res) => {
    const comments = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    postSchema.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comments }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name photo")
        .then((result) => {
            return res.json(result)
        })
        .catch((err) => {
            return res.status(422).json({ error: "Post Not Found" })
        })
})

//create delete post

router.delete('/delete/:postId', response, (req, res) => {
    postSchema.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id ")
        .then((result) => {
            //  console.log(result.postedBy._id)
            //  console.log(req.user._id)
            if (!result) {
                res.status(422).json({ error: "Post Not Found" })
            }
            if (result.postedBy._id.toString() === req.user._id.toString()) {
                console.log("Match") // if the user correct then remove that post means if the user owner of that post then delete that post
                postSchema.findByIdAndDelete(req.params.postId)
                    .then(() => {
                        res.json({message:"Delete Successfull"})
                    }).catch(() => {
                        res.status(500).json({ error: "Error Occured while Deleting Post" })
                    })
            }
            else {
                res.status(403).json({ error: "User Not Possible to Delete this post" })
            }
            //otherwise
            // else{
            //     console.log("Not Match")
            // }
        })
        .catch((err) =>{
            res.status(500).json({ error: "error Occured" })
        })
    
})

module.exports = router;