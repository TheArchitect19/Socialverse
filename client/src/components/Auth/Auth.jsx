import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import compress from '../compress';

const initialData ={firstName:'', lastName:'', email:'', password:'', password2:'', profilePicture:''};

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData,setFormData] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        if(isSignUp)
        dispatch(signup(formData,navigate));
        else
        dispatch(signin(formData,navigate));

        setFormData(initialData);
    }
    const handleToggle=()=>{
        setIsSignUp(!isSignUp);
        setFormData(initialData);
    }

    useEffect(()=>{

    }, [formData])

    useEffect(()=>{
        // console.log(formData)
        if(formData?.profilePicture!="")
        compress(formData?.profilePicture, 200).then((res)=>{formData.profilePicture=res;})
    }, [formData.profilePicture])

  return (
      <>
      <Navbar/>
      <Paper elevation={4} sx={{width:{xs:'90%',sm:'50%'},mx:{xs:'5%',sm:'25%'}, height:'85vh',my:2, display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'space-around'}}>
          <Typography sx={{fontFamily:'monospace', fontSize:{xs:'26px',sm:'32px'}, fontWeight:600, m:1}}>{isSignUp?'Sign Up':'Sign In'}</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{display:'flex', flexDirection:'column', width:'100%', m:1, alignItems:'center'}}>
                {isSignUp && (
                    <>
                    <Avatar src={formData.profilePicture} sx={{mx:1,width:'50px',height:'50px'}}/>
                    <Box sx={{display:'flex',m:1, justifyContent:'center', width:'100%'}}>
                        <TextField value={formData.firstName} required name='firstName' label='First Name' onChange={handleChange} sx={{mx:'2%', width:'43%'}}/>
                        <TextField value={formData.lastName} required name='lastName' label='Last Name' onChange={handleChange} sx={{mx:'2%', width:'43%'}}/>
                    </Box>
                    </>
                )}
                <TextField value={formData.email} required name='email' label='Username' type='text' onChange={handleChange} sx={{m:1, width:'90%'}}/>
                <TextField value={formData.password} required name='password' label='Password' type='password' onChange={handleChange} sx={{m:1, width:'90%'}}/>
                {isSignUp && (
                    <>
                    <TextField value={formData.password2} required name='password2' label='Confirm Password' onChange={handleChange} sx={{m:1, width:'90%'}}/>
                    <Box sx={{display:'flex', width:'100%',mx:1, justifyContent:'space-around', alignItems:'center'}}>
                        <Typography sx={{fontFamily:'monospace',fontSize:'12px',ml:2, fontWeight:600}}>Profile Picture</Typography>
                        <FileBase type='file' multiple={false} onDone={({base64})=>setFormData({...formData,profilePicture:base64})}/>

                    </Box>
                    </>
                )}

                <Button type='submit' variant='contained' color='success' sx={{width:'40%', m:0.5,mt:3}}>Submit</Button>
                <Button size='small' onClick={()=>{setFormData(initialData)}} variant='outlined' color='secondary' sx={{width:'30%', m:0.5}}>reset</Button>
            </Box>
          </form>
          <Button size='small' onClick={handleToggle}>{isSignUp?'Already have a account? Sign In':"Don't have an account? Sign Up"}</Button>

      </Paper>
    </>
  )
}

export default Auth