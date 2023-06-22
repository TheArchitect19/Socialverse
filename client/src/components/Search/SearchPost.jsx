import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Post from '../Feed/Post';
// import { Box } from '@mui/system';
import { IconButton, TextField, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {searchPosts} from '../../actions/posts';


const SearchPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, settext] = useState('');
    const [tags, settags] = useState('');
    const [loading, setload] = useState(false);
    const {searchposts} = useSelector((state)=>state.posts);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result);


    const handleSearch = () => {
        dispatch(searchPosts({query:text, tags}, navigate));
    }

    useEffect(()=>{
    }, [searchposts]);

    return (
        <>
        <Navbar/>
        <Box sx={{display:'flex', flexDirection:'column', width:{xs:'97.5%', sm:'75%', lg:'40%'}, mx:{xs:'1.25%', sm:'12.5%', lg:'30%'}, my:'5.5vh', height:'80vh', boxShadow:6, borderRadius:'5px', overflowY:'scroll'}}>
            <Box sx={{display:'flex', width:'100%', height:'12vh', alignItems:'center', background:'linear-gradient(90deg, rgba(250,69,232,1) 15%, rgba(255,250,0,1) 100%);', borderRadius:'5px 5px 0 0'}}>
                <TextField size='small' label='Caption' value={text} onChange={(e)=>{settext(e.target.value)}} sx={{width:'80%', m:1, mx:1, mr:0.5, bgcolor:'white', borderRadius:'5px'}} />
                <TextField size='small' label='Tags Seperated by comma' value={tags} onChange={(e)=>{settags(e.target.value)}} sx={{width:'80%', m:1, mx:1, ml:0.5, bgcolor:'white', borderRadius:'5px'}} />
                <IconButton onClick={handleSearch} sx={{mr:1}}> <Search></Search> </IconButton>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', width:'95%', mx:'2.5%', my:1,}}>
                {
                    !loading && (
                        searchposts?.map((p)=><Post post={p} user={user} key={p?._id}/>)
                    )
                }
            </Box>
        </Box>
        </>
    )
}

export default SearchPost;
