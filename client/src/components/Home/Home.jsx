import { Box } from '@mui/material'
import React, {useState, useRef} from 'react'
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfile } from '../../actions/user';
// import {io} from 'socket.io-client';

const Home = ({socket}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result);
    // const socket = useRef();

    
    useEffect(()=>{
        if(!user)
        navigate('/auth');
        dispatch(getMyProfile(user?._id, navigate));
        // if(user)
        // socket.current = io("ws://localhost:8900");

    },[user]);

    return (
        <>
            <Navbar user={user} setUser={setUser}/>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Leftbar/>

                <Feed user={user}/>

                <Rightbar socket={socket}/>
            </Box>
        </>
    )
}

export default Home