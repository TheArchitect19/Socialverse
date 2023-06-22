import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Avatar, Box, Button, ButtonBase, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { followUser, getFriends, getMyProfile, getProfile, unfollowUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../actions/posts';
import Post from '../Feed/Post';
import { EXTRA } from '../../constants/actiontypes';

const profileTypo = {fontFamily:'monospace', fontSize:{xs:'8px',sm:'14px',lg:'17px',xl:'20px'}, color:'white'};
const infoTypo = {fontFamily:'monospace', fontSize:{xs:'8px',sm:'14px',lg:'17px',xl:'20px'}, color:'white',mx:3,my:0.3};
const profileBox = {borderRadius:'15%', p:0.5,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}

const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"))?.result;
    if (!user)
    navigate('/auth');

    let {id} = useParams();
    if (id=='this')
    id=user._id;

    const {profile} = useSelector((state)=>state.user);
    const {userPosts} = useSelector((state)=>state.user);
    const {mydetails} = useSelector((state)=>state.user);

    useEffect(()=>{
        dispatch(getProfile(id, navigate));
        dispatch(getMyProfile(user?._id, navigate));
        dispatch(getUserPosts(id));
    },[])


    const handleFriends = () => {
        dispatch({type:EXTRA, payload:{followers:profile?.followers, following:profile?.following, requests:profile?.requests, id:profile?._id}});
        dispatch(getFriends({followers:profile?.followers, following:profile?.following, requests:profile?.requests, id:profile?._id},navigate));
        console.log(mydetails)
        navigate(`/friends/${id}`);
    };


    const Follow = () =>{

        const [doesFollow, setFollow] = useState(mydetails?.following?.includes(id));
        const [requested, setReq] = useState(mydetails?.requestedToFollow?.includes(id));

        const isMe = id==user._id;
        const display = isMe?'none':'block';

        console.log(doesFollow,requested)

        const handleFollow = () =>{

            if(Array.isArray(profile?.followers))
            setFollow(profile?.followers?.includes(user?._id));
            else
            setFollow(false);
    
            setReq(profile?.requestedToFollow?.includes(id));
    
            if(!doesFollow)
            {
                if(!requested)
                {
                    profile?.requestedToFollow?.push(id);
                    setReq(true);
                }
                dispatch(followUser(id, navigate));
            }
            else 
            {
                dispatch(unfollowUser(id, navigate));
                window.location.reload();
            }
    
        };
        return (            
            <Box display={display} >
                <Button onClick={handleFollow} variant='contained' color='inherit'>{doesFollow?'UnFollow':(requested?'Requested':'Follow')}</Button>

            </Box>
        )
    }

  return (
    <>
    <Navbar/>
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', m:0,width:'100%',height:'91vh',overflowY:'scroll'}}>
        <Box sx={{width:'100%',backgroundColor:'#005ce6',height:{xs:'8vh',sm:'14vh',lg:'20vh',xl:'25vh'},display:'flex', alignItems:'center',justifyContent:'space-around'}}>
            <ButtonBase onClick={handleFriends} disabled={profile?.follow=='no'}>
                <Box sx={profileBox}>
                    <Typography sx={profileTypo}> {profile?.follow=="yes"?profile?.followers?.length:profile?.followers} </Typography>
                    <Typography sx={profileTypo}>Followers</Typography>
                </Box>
            </ButtonBase>
            <Box>
                <Avatar sx={{border:'2px solid white',width:'16vw',height:'16vw',mt:'8vw'}} src={profile?.profilePicture}/>
            </Box>
            <ButtonBase onClick={handleFriends} disabled={profile?.follow=='no'}>
                <Box sx={profileBox}>
                    <Typography sx={profileTypo}> {profile?.follow=="yes"?profile?.following?.length:profile?.following} </Typography>
                    <Typography sx={profileTypo}>Following</Typography>            
                </Box>
            </ButtonBase>
        </Box>

        
        <Box sx={{width:'100%',minHeight:{xs:'8vh',sm:'14vh',lg:'18vh',xl:'20vh'},display:'flex',justifyContent:'space-between',alignItems:'center',backgroundColor:'#0000cc'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                {profile?.follow=='yes' && (
                    <>
                    <Typography sx={infoTypo}>DOB {profile?.personalInfo?.DOB}</Typography>
                    <Typography sx={infoTypo}>Relationship status {profile?.personalInfo?.relationship}</Typography>
                    <Typography sx={infoTypo}>City {profile?.personalInfo?.city}</Typography>
                    </>
                )}
            </Box>
            <Box sx={{mx:3}}>
                <Follow/>
            </Box>
        </Box>
        <Typography sx={{fontFamily:'monospace',fontSize:{xs:'26px',sm:'40px',lg:'45px',xl:'60px'},m:1}}>{profile?.name}</Typography>
        <Typography sx={{fontFamily:'monospace',fontSize:{xs:'12px',sm:'16px',lg:'18px',xl:'20px'},m:1,mx:2}}>{profile?.desc?.slice(0,100)}...</Typography>
        
        {profile?.follow==='yes' ? (
            <Box sx={{display:'flex', flexDirection:'column',alignItems:'center', width:{xs:'95%',sm:'80%',lg:'60%',xl:'50%'}}}>
                {userPosts?.map((p,i)=>(
                    <Post post={p} key={`z${i}`} user={user}/>
                ))}
            </Box>
            
        ):(
            <Box sx={{display:'flex', flexDirection:'column',alignItems:'center', width:{xs:'95%',sm:'80%',lg:'60%',xl:'50%'}}}>
                <Typography>Follow user to see their posts</Typography>
            </Box>
        )}
    </Box>
    </>
  )
}

export default Profile