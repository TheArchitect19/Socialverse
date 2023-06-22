const router = require('express').Router();
const User = require('../Models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.SECRET;

router.post('/signup', async (req,res)=>{
    try {
        const {email, password, firstName, lastName, profilePicture} = req.body;
        const name = `${firstName} ${lastName}`
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(200).json({error:"User Already exists!"});

        const hashedpassword = await bcrypt.hash(password,12);

        const newUser = new User({email, password:hashedpassword, name, profilePicture});
        const user = await newUser.save();

        const token = jwt.sign({email, id:user._id}, SECRET,{expiresIn:"3h"});

        res.status(200).json({result:user,token});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/signin',async (req,res)=>{
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(200).json({error:"User doesn't Exists!"});
        // const valid = await bcrypt.compare(password,existingUser.password);
        // if (!valid) return res.status(200).json({error:"Invalid Credentials!"});

        const token = jwt.sign({email, id:existingUser._id}, SECRET, {expiresIn:"3h"});

        res.status(200).json({result:existingUser,token});

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/updatepass',async (req,res)=>{
    try {
        const {email,password,newPassword} = req.body;
        const user = await User.findOne({email});
        const valid = await bcrypt.compare(password,user.password);
        if (!valid) return res.status(200).json({error:"Incorrect password!"});
        const hashedPassword = await bcrypt.hash(newPassword,12);
        await User.findOneAndUpdate({email},{password:hashedPassword});

        res.status(200).json({message:"Password Updated"})
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;