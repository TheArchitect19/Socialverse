import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import NoImage from '../../images/noImage.png';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import compress from '../compress';


const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result);
  const initialData = {creatorName:user.name, creator:user._id, caption:'', tags:'', photo:''}
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (!user)
      navigate('/auth');
  }, [user]);

  const handleUpload = () =>{dispatch(createPost({...formData,tags:formData.tags.split(',')},navigate))}
  const handleChange = (e) =>{
    console.log(formData);
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    if(formData?.photo!="")
    compress(formData.photo).then((res)=>{formData.photo=res});
  }, [formData.photo])

  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Paper elevation={6} sx={{width:{xs:'90%',sm:'60%'},height:'88vh',mx:{xs:'5%',sm:'20%'},my:'1vh', overflowY:'scroll'}}>
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'space-around', width:'100%',height:'100%', p:'1%',}}>
          <Typography sx={{fontFamily:'monospace',fontSize:'26px', fontWeight:600}}>Create a Post</Typography>
          <TextField size='small' onChange={handleChange} name='caption' label='Caption' multiline maxRows={2} sx={{m:1,width:{xs:'90%',sm:'65%'}}}/>
          <TextField size='small' onChange={handleChange} name='tags' label='Tags (Comma separated, without # or @)' sx={{width:{xs:'90%',sm:'65%'}}}/>
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center',m:1}}>
            <Typography sx={{fontFamily:'monospace',fontSize:'16px', fontWeight:500, mr:1}}>Select a photo :</Typography>
            
            <FileBase type='file' multiple={false} onDone={({base64})=>{
              setFormData({...formData,photo:base64})
            }} />
          </Box>
          <img style={{height:'40vh', maxWidth:'80%', objectFit:'cover'}} src={formData.photo!=""?formData.photo:NoImage}/>
          <Button sx={{m:1}} variant='contained' onClick={handleUpload} >Upload</Button>
        </Box>
      </Paper>
    </>
  )
}

export default CreatePost;