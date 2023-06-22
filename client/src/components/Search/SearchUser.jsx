import React, { useState, useEffect } from 'react';
import {Box, IconButton, TextField, Typography, Avatar, ButtonBase} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { Search, Send } from '@mui/icons-material';
import { searchUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [text, settext] = useState("");
    const [loading, setLoading] = useState(false);
    const {searchuser} = useSelector((state)=>state.user);

    const handleSearch = () => {
        if(text!="")
        dispatch(searchUser(text, 1, navigate));
    }

    const handleChange = (e) =>{
        settext(e.target.value);
    }

    const handleProfile = (id) => {
        navigate(`/profile/${id}`);
    }

    useEffect(()=>{
        if(text.length>2)
        {setLoading(true);
        dispatch(searchUser(text, 0, navigate));}
    }, [text]);

    useEffect(()=>{
        console.log(text);
        setLoading(false);

    }, [searchuser]);


    return (
        <>
        <Navbar/>
        <Box sx={{display:'flex', flexDirection:'column', width:{xs:'97.5%', sm:'75%', lg:'40%'}, mx:{xs:'1.25%', sm:'12.5%', lg:'30%'}, my:'5.5vh', height:'80vh', boxShadow:9, borderRadius:'5px'}}>
            <Box sx={{display:'flex', width:'100%', height:'12vh', alignItems:'center', background:'linear-gradient(90deg, rgba(250,69,232,1) 15%, rgba(255,250,0,1) 100%);', borderRadius:'5px 5px 0 0'}}>
                <TextField label='UserName' value={text} onChange={handleChange} sx={{width:'80%', m:2, bgcolor:'white', borderRadius:'5px'}} />
                <IconButton onClick={handleSearch}><Search sx={{my:2}}/></IconButton>
                
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', width:'95%', mx:'2.5%', my:1, overflowY:'scroll', height:'70vh'}}>
            {
                !loading && searchuser?.map((u)=>{
                    return (
                        <ButtonBase key={u?._id} sx={{width:'97%', m:1, mx:'1.5%', boxShadow:3, borderRadius:'5px'}} onClick={()=>handleProfile(u?._id)}>
                        <Box sx={{display:'flex', alignItems:'center', width:'100%',m:0.5}}>
                            <Avatar sx={{m:1,width:'50px', height:'50px'}} src={u?.profilePicture} alt={u?.name}/>
                            <Box sx={{width:'70%',display:'block', m:1,textAlign:'left'}}>
                            <Typography sx={{fontFamily:'monospace', fontWeight:'600',fontSize:{xs:'18px',sm:'18px',lg:'20px'}}}>{u?.name}</Typography>
                            <Typography sx={{fontFamily:'monospace', fontWeight:'500',fontSize:{xs:'15px',sm:'15px',lg:'17px'}}}>{u?.email}</Typography>
                            </Box>
                        </Box>
                        </ButtonBase>
                    )
                })
            }
            {
                loading && (
                    <Box sx={{display:'flex', width:'50%', height:'100%', alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                        <Typography sx={{fontFamily:'monospace', fontWeight:400, fontSize:'30px', color:'purple', border:'2px solid purple', p:1, borderRadius:'5px'}}>Loading...</Typography>
                    </Box>
                )
            }
            </Box>
        </Box>
        </>
    )
}

export default SearchUser;
