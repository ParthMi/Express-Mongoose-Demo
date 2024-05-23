const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require("../models/User");


router.post('/create', async (req, res) => {
    try {
        const user = await User(req.body).save()
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving user' });
    }
})

router.get('/search', async (req, res) => {
    try {
        var searchTxt = req.query.searchTerm;
        console.log(searchTxt)
        searchTxt=new RegExp(searchTxt,"i");
        const user = await User.find({ 
            $or:[
                {"email":searchTxt},
                {"username":searchTxt},
            ]
         });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error ' });
    }
})

router.put('/put/:uid', async (req, res) => {
    try {
        var uid = req.params.uid;
        const updatedUser = await User.findOneAndUpdate(
            { user_id: uid },
            { 
                username: "updatedUsername", 
                email: "updatedEmail@example.com"
            },
            { new: true }
        );
        
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error' });
    }
})


router.delete('/delete/:uid', async (req, res) => {
    try {
        var uid = req.params.uid;
        const user = await User.findOneAndDelete({ user_id: uid });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});


router.get('/:uid', async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await User.find({ user_id: uid });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error saving user' });
    }
})



module.exports = router;