const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    desc:{
        type:String,
        default:"" 
    },

    personalInfo:{
        type:new mongoose.Schema({
            DOB:String,
            city:String,
            relationship:String,
        }),
        default:{}
    },

    profilePicture:String,

    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    followRequests:{
        type:[String],
        default:[]
    },
    requestedToFollow:{
        type:[String],
        default:[]
    },

    chat:{
        type:[String],
        default:[]
    },
    messages:{
        type:[{
            chatId:String,
            senderId:String,
            time:{
                type:Date,
                default:new Date
            },
            text:String,
            seen:{
                type:Boolean,
                default:false
            }
        }],
        default:[]
    }
}, {timestamps:true});

module.exports= mongoose.model("User",UserSchema);