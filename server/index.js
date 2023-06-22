const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

const authRoutes = require('./Routes/auth.js');
const userRoutes = require('./Routes/user.js');
const postRoutes = require('./Routes/post.js');

//dotenv
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json({limit:"10mb",extented:true}));
app.use(bodyparser.urlencoded({limit:"10mb",extended:true}));

//routes
app.get('/',(req,res)=>res.send('Welcome to FakeBook API!'));
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/post',postRoutes);
console.log("object")

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on Port ${PORT}`)))
    .catch((err)=>console.log(err));