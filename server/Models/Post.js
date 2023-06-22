const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    creator:{
        type:String,
        required:true
    },
    creatorName:{
        type:String,
        required:true
    },
    creatordp:{
        type:String,
        default:""
    },

    caption:{
        type:String,
        max:300,
        default:""
    },
    photo:{
        type:String,
        default:""
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[{
            senderId:String,
            text:String,
            senderName:String
        }],
        default:[]
    }
},{timestamps:true});

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;