import { Avatar, Box, ButtonBase, Card, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment, deletePost, getPost } from '../../actions/posts';
import Post from '../Feed/Post';
import Navbar from '../Navbar/Navbar';
import { DeleteOutline, ArrowCircleUp } from '@mui/icons-material';

const PostDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("profile"))?.result;
    if (!user)
        navigate('/auth');

    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id, navigate));
    }, [])

    const { post } = useSelector((state) => state.posts);

    const [comment, setC] = useState('');

    const handleProfile = (id) => {
        navigate(`/profile/${id}`);
    }

    const handleDelete = () =>{
        dispatch(deletePost(post?._id, navigate));
    }

    const handleAddComment = ()=>{
        const data = {senderId:user?._id, text:comment, senderName:user?.name};
        dispatch(addComment(post?._id, data, navigate));
        setC('');
    };

    const handleDeleteComment = (cid) => {
        const data ={postId:post?._id, commentId:cid};
        dispatch(deleteComment(data,navigate));
    }


    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: 'lightgray', display: 'block', width: { xs: '95%', sm: '80%', lg: '60%' }, height: '91vh', mx: { xs: '2.5%', sm: '10%', lg: '20%' }, overflowY: 'auto' }}>
                <Post post={post} user={user} detail={true} />
                {post?.creator==user?._id &&(
                    <Box sx={{display:'flex', justifyContent:'flex-end', width:'90%', mx:'5%'}}>
                        <ButtonBase onClick={handleDelete}>
                            <DeleteOutline/>
                            <Typography>Delete Post</Typography>
                        </ButtonBase>
                    </Box> 
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', mx: '5%', mt: -2, mb: 2 }}>

                    <Typography sx={{ fontFamily: 'monospace', fontSize: '24px' }}>Comments</Typography>

                    <Paper sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <TextField value={comment} sx={{m:1, width:'80%'}} multiline maxRows={2} label='Add a Comment' onChange={(e)=>setC(e.target.value)}/>
                        <IconButton onClick={handleAddComment}>
                            <ArrowCircleUp fontSize='medium'/>
                        </IconButton>
                    </Paper>

                    {post?.comments?.map((c, i) => (
                        <Card key={`comm${i}`} elevation={2} sx={{ width: '90%', mx: '5%', my: 1, display: 'flex', flexDirection: 'column' }}>
                            
                            <Box sx={{ display: 'flex', justifyContent:'space-between'}}>
                                <ButtonBase onClick={()=>handleProfile(c.senderId)}>
                                    <Typography sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: { xs: '14px', sm: '18px' }, mx: 1 }} >{c?.senderName}</Typography>
                                </ButtonBase>
                                {(post?.creator==user?._id || c?.senderId==user?._id) && (
                                    <IconButton onClick={()=>handleDeleteComment(c?._id)}>
                                        <DeleteOutline fontSize='small'/>
                                    </IconButton>
                                )}
                            </Box>

                            <Typography sx={{ fontFamily: 'monospace', fontWeight: 500, fontSize: { xs: '12px', sm: '14px' }, mx: 1.5 }}>
                                {c.text}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default PostDetails