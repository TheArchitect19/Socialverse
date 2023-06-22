import { Avatar, Box, Button, ButtonBase, Divider, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { acceptFollow, deleteFollow } from '../../actions/user';
import Navbar from '../Navbar/Navbar';


const Friends = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  if (!user)
  navigate('/auth');

  // let {friends} = useSelector((state)=>state.user);
  let {friendsProfile} = useSelector((state)=>state.user);

  const [friends, setF] = useState(useSelector((state)=>state.user.friends));

  let {id} = useParams();
  if (id=='this')
  id=user._id;
  
  const userId = friends?.id;
  const isMe = userId==user?._id;

  useEffect(()=>{
    // console.log(friends)
  
    if(!friends.followers)
    navigate('/');
  },[friends]);

  const handleAccept = (u) =>{
    dispatch(acceptFollow(u,navigate));
    setF({...friends, requests:friends?.requests?.filter((id)=>id!=u), followers:[u, ...friends.followers]});
  }
  const handleDelete = (u) =>{
    dispatch(deleteFollow(u,navigate))

    setF({...friends, requests:friends.requests.filter((id)=>id!=u)});
  }
  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  }

  
  const Block = ({u, request}) =>{
    return (
      <Paper elevation={2} sx={{display:'flex',alignItems:'center',width:{sm:'90%',lg:'80%'},mx:{xs:'5%',lg:'10%'},my:1, flexDirection:'column'}}>

          <ButtonBase sx={{width:'100%'}} onClick={()=>handleProfile(u?._id)}>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center', width:'100%',m:0.5}}>
            <Avatar sx={{m:1,width:{sm:'28px',lg:'36px'},height:{sm:'28px',lg:'36px'}}} src={u?.profilePicture} alt={u?.name}/>
            <Box sx={{width:'100%',display:'block', my:1,textAlign:'center'}}>
              <Typography sx={{fontFamily:'monospace', fontWeight:'600',fontSize:{xs:'18px',sm:'18px',lg:'20px'}}}>{u?.name}</Typography>
              <Typography sx={{fontFamily:'monospace', fontWeight:'500',fontSize:{xs:'15px',sm:'15px',lg:'17px'}}}>{u?.email}</Typography>
            </Box>
          </Box>
          </ButtonBase>
          { request && (
            <Box sx={{width:'100%', display:'flex', justifyContent:'space-around',mb:1}}>
              <Divider/>
              <Button size='small' variant='contained' color='success' onClick={()=>handleAccept(u?._id)}>Accept</Button>
              <Button size='small' variant='contained' color='secondary' onClick={()=>handleDelete(u?._id)}>Delete</Button>
            </Box>
          )}

        </Paper>
    )
  }

  const Desktop = () =>{
    return (
      <Box sx={{display:{sm:'block'}}}>
      <Box sx={{display:'flex',justifyContent:'space-around',width:'100%',height:'8vh'}}>
        <Typography sx={{fontFamily:'monospace',fontWeight:600,fontSize:'20px'}}>Followers</Typography>
        <Typography sx={{fontFamily:'monospace',fontWeight:600,fontSize:'20px'}}>Following</Typography>
        {isMe && (
          <Typography sx={{fontFamily:'monospace',fontWeight:600,fontSize:'20px'}}>Requests</Typography>
        )}
      </Box>

      <Box sx={{display:'flex',justifyContent:'space-around'}}>

        <Box sx={{display:'block',overflowY:'scroll',height:'80vh',width:'33.3%',borderLeft:'5px solid #E8E9E9'}}>
          {
            friends?.followers?.map((f,i)=>{
              const u = friendsProfile?.data?.find(x=>x?._id==f);
              return (
                <Block request={false} u={u} key={`15${i}`}/>
              )
            })
          }
        </Box>

        <Box sx={{display:'block',overflowY:'scroll',height:'80vh',width:'33.3%',borderLeft:'5px solid #E8E9E9'}}>
          {
            friends?.following?.map((f,i)=>{
              const u = friendsProfile?.data?.find(x=>x?._id==f);
              return (
                <Block request={false} u={u} key={`15${i}`}/>
              )
            })
          }        
        </Box>

        <Box display={isMe?'block':'none'} sx={{overflowY:'scroll',height:'80vh',width:'33.3%'}}>
          {
            Array.isArray(friends?.requests) &&(
            friends?.requests?.map((f,i)=>{
              const u = friendsProfile?.data?.find(x=>x?._id==f);
              return (
                <Block request={true} u={u} key={`15${i}`}/>
              )
            })
            )
          } 
        </Box>

      </Box>
      </Box>
    )
  }
  
  return (
      <>
      <Navbar/>

      <Box sx={{display:'flex',justifyContent:'center',width:'100%',height:'8vh'}}>
        <Typography sx={{fontFamily:'monospace',fontWeight:600,fontSize:'5vh'}}>Friends</Typography>
      </Box>

      <Desktop />
      
      
      </>
  )
}

export default Friends