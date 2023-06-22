import { Avatar, Card, CardActions, CardContent, Button, CardMedia, Typography, ButtonBase } from '@mui/material'
import { Box, flexbox, width } from '@mui/system'
import React, { useState } from 'react';
import noimg from '../../images/noImage.png';
import { Favorite, FavoriteBorder, Launch } from '@mui/icons-material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { likePost } from '../../actions/posts';
import { getProfileforPost } from '../../actions/user';

const Post = ({ post,user,detail }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] =useState(post?.likes?.includes(user?._id));

  const handleLike = () => {
    setIsLiked(post?.likes?.includes(user?._id));
    if(isLiked)
    {
      post.likes=post.likes.filter(l=>l!=user?._id);
      setIsLiked(false);
    }
    else
    {
      post.likes.push(user?._id);
      setIsLiked(true);
    }

    dispatch(likePost(post?._id));
    
  };

  const handleOpen = () => {
    navigate(`/post/${post?._id}`);
  };

  const handleProfile = () => {
    navigate(`/profile/${post?.creator}`);
  };

  
  const Like = ({ post }) => {
    setIsLiked(post?.likes?.includes(user?._id));
    return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: { xs: '13px', sm: '16px', lg: '18px' } }}>{post?.likes?.length} Likes&nbsp;</Typography>
      {isLiked?<Favorite fontSize='medium' sx={{ color: 'red' }} />:<FavoriteBorder fontSize='medium' sx={{ color: 'red' }} />}
    </Box>
    )
  }


  if (!post?.message)
  return (
    <Card elevation={4} sx={{ width: '90%', mx: '5%', my: 3 }}>
      <Box sx={{ m: 1, display: 'flex', flexDirection: 'column' }}>

        <Box sx={{ display: 'flex' }}>
          <ButtonBase onClick={handleProfile}>
            <Avatar src={post?.creatordp} sx={{ height:'50px', width:'50px', m: 1, mr: 2 }}></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 0.5, alignItems:'start' }}>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: { xs: '15px', sm: '18px' }, m: 0 }} >{post?.creatorName}</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 500, fontSize: '12px' }} >{post?.email}&nbsp;&nbsp;{moment(post?.createdAt).fromNow()}</Typography>
            </Box>
          </ButtonBase>
        </Box>

        <CardContent sx={{display:'flex', flexDirection:'column'}}>
          <Typography variant='body1' sx={{ fontSize: { xs: '12px', sm: '15px', lg: '18px' } }}>{post?.caption?.length > 100 ? `${post?.caption.slice(0, 100)}...` : post?.caption}</Typography>
          <Box sx={{display:'flex',mx:1}}>
          {
            post?.tags?.length!=0 && (
              post?.tags?.map((t)=>{
                return (
                  <>
                  <Typography variant='body1' sx={{ fontSize: { xs: '12px', sm: '15px', lg: '18px' } }}>#{t}&nbsp;</Typography>
                  </>
                )
              })
            )
          }
          </Box>
        </CardContent>

        <img src={post?.photo?.length > 10 ? post.photo : noimg} alt="" style={{ objectFit: 'contain', margin: '0 2%', borderRadius: '1%' }} />


        <CardActions sx={{ display: 'flex', mt: 1.5, mx: 0.5, justifyContent: 'space-around' }}>

          <ButtonBase onClick={handleLike}>
            <Like post={post}/>
          </ButtonBase>

          <Typography sx={{ fontSize: { xs: '10px', sm: '15px', lg: '18px' } }}>{post?.comments?.length} Comments</Typography>

          {!detail && (
            <Button onClick={handleOpen}>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: { xs: '10px', sm: '15px', lg: '18px' }, mr: 0.25 }}>Open Post</Typography>
              <Launch fontSize='small' />
            </Button>
          )}

        </CardActions>

      </Box>
    </Card>
  )
}

export default Post