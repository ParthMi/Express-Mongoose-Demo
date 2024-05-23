const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/all", async (req, res) => {
  try {
    Post.find().populate('user').then((posts)=>{
      res.status(200).json(posts);    
    })
    .catch((error)=>{
      console.log(error)
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.post("/create", async (req, res) => {
  try {
    const posts = await Post(req.body).save()
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});


module.exports = router;
