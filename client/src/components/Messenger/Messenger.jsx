import { Box } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Chats from './Chats';
import ChatWindow from './ChatWindow';
import { getFriends, updateMessages } from '../../actions/user';
import Socket from './Socket';

const Messenger = ({socket}) => {
    // console.log('messenger rendered');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.result);
    const [current, setCurr] = useState("");
    const {mydetails} = useSelector((state)=>state.user);
    // console.log(socket)
    // const messageListen = () =>{
    //     console.log('calles')
    //     dispatch(updateMessages());
    // };
    // socket.on("getMessage", messageListen);
    

    useEffect(()=>{
        if(!user)
        navigate('/auth');
        dispatch(getFriends({followers:mydetails?.followers, following:mydetails?.following, requests:mydetails?.requests, id:mydetails?._id},navigate));
    }, [user]);

    return (
        <>
        <Navbar user={user} setUser={setUser}/>

        <Socket socket={socket}/>

        <Box sx={{display:{xs:'none', sm:'flex'}, flexDirection:'row'}}>
            <Chats socket={socket} setCurr={setCurr} details={mydetails} curr={current}/>
            <ChatWindow socket={socket} curr={current} details={mydetails}/>
        </Box>

        <Box sx={{display:{xs:'flex', sm:'none'}, flexDirection:'row'}}>
            {current=="" && (<Chats socket={socket} setCurr={setCurr} details={mydetails} curr={current}/>)}
            {current!="" && (<ChatWindow socket={socket} curr={current} details={mydetails}/>)}
        </Box>
        </>
    )
}

export default Messenger;