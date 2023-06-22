const router = require('express').Router();
const Post = require('../Models/Post.js');
const User = require('../Models/User.js');
const auth = require('../Middlewares/auth.js');

const getProfile = async (id) => {
    try {
        const user = User.findById(id, {name:1, email:1, profilePicture:1});
        return user;
    } catch (error) {
        console.log(error);
    }
}
 
//create a post
router.post('/createpost', auth, async (req,res)=>{
    try {
        const userId = req.userId;
        const data = req.body;
        
        if (data.creator!=userId) return res.status(400).json({message:"Invalid Request!"});

        const newPost = new Post(data);
        const result = await newPost.save();

        res.status(200).json(result);

    } catch (error) {
        res.status(502).json(error);
    }
});

//get posts by search
router.post('/search', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const data = req.body;
        let {tags, query} = data;
        if(query=='')
        query="jjkjjkjjkjjkjjkjjkjjkjjkjjkjjkjjkjkjkjkjkjk-1-1-1-1-1-";
        const caption = new RegExp(query,'i');
        
        const user = await User.findById(userId,{following:1});
        
        let people = [userId];
        people = people.concat(user.following);

        const posts = await Post.find({$and:[{creator:{$in:people}}, {$or:[{caption},{tags:{$in:tags.split(',')}}]}]}).sort({_id:-1}).limit(10);

        const newPosts = await Promise.all(
            posts.map((p)=>{
                return getProfile(p?.creator).then((res)=>{
                    const ans = {...p._doc, creatorName:res?.name, email:res?.email, creatordp:res?.profilePicture};
                    return ans;
                })
            })
        )
        res.status(200).json(newPosts);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get a post
router.get('/:id', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const id = req.params.id;

        const post = await Post.findById(id);
        let isAuthorized = false;

        if(post.creator==userId)
        isAuthorized=true;
        
        const user = await User.findById(post.creator,{followers:1});

        if (user.followers.includes(userId))
        isAuthorized=true;

        if(!isAuthorized)
        return res.status(400).json({message:"You are not authorized to see this post"});

        const result = await getProfile(post?.creator).then((res)=>{
            return {...post._doc, creatorName:res?.name, email:res?.email, creatordp:res?.profilePicture}
        })
        // console.log(result);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
})

//get a user's post
router.get('/:id/userposts', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const id = req.params.id;
        let isAuthorized = false;

        const user = await User.findById(id,{followers:1});

        if(id==userId)
        isAuthorized=true;
        
        if (user.followers.includes(userId))
        isAuthorized=true;

        if(!isAuthorized)
        return res.status(201).json({message:"You are not authorized to see user's posts"});

        const posts = await Post.find({creator:id}).sort({_id:-1});

        const newPosts = await Promise.all(
            posts.map((p)=>{
                return getProfile(p?.creator).then((res)=>{
                    const ans = {...p._doc, creatorName:res?.name, email:res?.email, creatordp:res?.profilePicture};
                    return ans;
                })
            })
        )

        res.status(208).json(newPosts);

    } catch (error) {
        res.status(500).json(error);
    }
});

//update a post
router.put('/:postId/updatePost', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const data = req.body;
        const postId= req.params.postId;
        const creator = data.creator;

        delete data.comments;
        delete data.likes;
        delete data.creator;
        delete data.creatorName;

        if (creator!=userId) return res.status(400).json({message:"you are not authorized to edit this post!"});

        const result = await Post.findByIdAndUpdate(postId, {$set:data},{new:true});

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
});

//timeline
router.get('/timeline/:flag', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const flag = req.params.flag;
        const startIndex = flag*3;
        const endIndex = (flag+1)*3;

        const user = await User.findById(userId,{following:1});

        let people = [userId];
        people=people.concat(user.following);

        const result = await Post.find({creator:{$in:people}}).sort({_id:-1}).skip(startIndex).limit(endIndex);

        const newPosts = await Promise.all(
            result.map((p)=>{
                return getProfile(p?.creator).then((res)=>{
                    const ans = {...p._doc, creatorName:res?.name, email:res?.email, creatordp:res?.profilePicture};
                    return ans;
                })
            })
        )

        res.status(200).json(newPosts);

    } catch (error) {
        res.status(500).json(error);
    }
});

//delete a post
router.delete('/delete/:id', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        
        if (post.creator!=userId) return res.status(400).json({message:"you are not authorized to delete this post!"});

        await post.delete();

        res.status(200).json({message:"Post deleted"});

    } catch (error) {
        res.status(500).json(error);
    }
})

//like a post
router.get('/like/:id', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const id= req.params.id;

        if (!userId) return res.status(400).json({message:"you are not authorized to delete this post!"});

        const post = await Post.findById(id,{likes:1,creator:1});

        if(post.likes.includes(userId))
        {
            post.likes=post.likes.filter(l=>l!=userId);
            const result = await post.save();
            return res.status(200).json({message:"Post disliked",result});
        }
        else{
            post.likes.push(userId);
            const result = await post.save();
            return res.status(200).json({message:"Post liked",result});
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

//comment on a post
router.put('/comment/:postId', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const postId = req.params.postId;
        const data = req.body;

        const post = await Post.findById(postId,{comments:1,creator:1});
        const user = await User.findById(post.creator,{followers:1});

        if(post.creator!=userId && !user.followers.includes(userId)) return res.status(400).json({message:"you are not authorized to comment on this post!"});

        post.comments.unshift(data);
        const result = await post.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
});
 
//delete comment
router.put('/deletecomment', auth, async(req,res)=>{
    try {
        const userId = req.userId;
        const {postId, commentId} = req.body;

        const post = await Post.findById(postId,{comments:1,creator:1});

        post.comments = post.comments.filter(c=>c._id!=commentId);

        const result = await post.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;