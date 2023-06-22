import { Avatar, Button, TextField, Box, } from '@mui/material';
import FileBase from 'react-file-base64';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import compress from '../compress';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../actions/user';


const UpdateProfile = () => {

    const {mydetails} = useSelector((state)=>state.user);
    const [data, setData] = useState(mydetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(data?.profilePicture!="")
        compress(data?.profilePicture, 200).then((res)=>{data.profilePicture=res;})
    },[data?.profilePicture]) ;

    useEffect(()=>{
        // console.log(data);

    })

    const handleSubmit = () => {
        delete data?.password;
        delete data?.email;
        delete data?.followers;
        delete data?.following; 
        delete data?.requestedTofollow;
        delete data?.followRequests;
        delete data?.chat;
        delete data?.messages;
        delete data?._id;
        dispatch(updateUser(data, navigate));
    };

    const handleReset = () => {
        setData(mydetails);
    };

    const styles ={
        m:1,
        width:{xs:'85%', sm:'60%'}
    }

    return (
        <>
        <Navbar/>
        <Box sx={{display:'flex', flexDirection:'column', width:{xs:'95%', sm:'75%', lg:'50%'}, mx:{xs:'2.5%', sm:'12.5%', lg:'25%'}, my:3, alignItems:'center', boxShadow:5, }}>
            <Avatar src={data?.profilePicture} sx={{m:2, height:'80px', width:'80px'}}/>
            <TextField size='small' onChange={(e)=>{setData({...data, name:e.target.value})}} value={data?.name} label='Name' sx={styles}/>
            <TextField size='small' onChange={(e)=>setData({...data, desc:e.target.value})} value={data?.desc} label='Description' sx={styles}/>
            <TextField size='small' onChange={(e)=>setData({...data, personalInfo:{...data?.personalInfo, city:e.target.value}})} value={data?.personalInfo?.city? data?.personalInfo?.city :""} label='City' sx={styles}/>
            <TextField size='small' onChange={(e)=>setData({...data, personalInfo:{...data?.personalInfo, relationship:e.target.value}})} value={data?.personalInfo?.relationship?data.personalInfo.relationship:""} label='Relationship Status' sx={styles}/>
            <TextField size='small' onChange={(e)=>setData({...data, personalInfo:{...data?.personalInfo, DOB:e.target.value}})} value={data?.personalInfo?.DOB? data?.personalInfo?.DOB : ""} label='BirthDay' sx={styles}/>
            <FileBase type='file' multiple={false} onDone={({base64})=>setData({...data,profilePicture:base64})}/>
            <Button sx={{m:1}} onClick={handleSubmit}>Update</Button>
            <Button sx={{mb:1}} onClick={handleReset}>Reset</Button>
        </Box>
        </>
    )
}

export default UpdateProfile;
