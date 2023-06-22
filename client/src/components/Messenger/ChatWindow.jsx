import { Avatar, Box, Typography, ButtonBase, IconButton, TextField } from "@mui/material";
import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CallMade, Send } from '@mui/icons-material';
import Message from "./Message";
import { addMessage } from "../../actions/user";

const ChatWindow = ({curr, details, socket}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {friendsProfile} = useSelector((state)=>state?.user);
    const friendInfo = friendsProfile?.data;
    const temp = friendInfo?.filter((p)=> p?._id==curr);
    const profile = temp && temp[0];

    const [text, settext] = useState("");

    const allMess = details?.messages;
    const messages = allMess?.filter((m)=> m?.chatId==curr);

    const last = useRef();

    const handleProfile = () => {
        navigate(`/profile/${curr}`);
    }

    const handleSend = () => {    
        const data = {text:text, senderId:details?._id, chatId:curr, seen:false};    
        
        dispatch(addMessage(data, navigate)).then(()=>{
            socket.emit("message", {senderId:details?._id, receiverId:curr});

        });
        settext("");
    }

    useEffect(()=>{
        last?.current?.scrollIntoView({behavior:'smooth'})

    })
    
    if(curr=="")
    return (
        <>
        <Box sx={{width:{xs:'100%', sm:'55%'}, my:3, display:'flex', justifyContent:'center'}}>
            <Typography sx={{color:'gray', fontFamily:'monospace', fontWeight:'600', fontSize:'30px', alignSelf:'center'}}>Open a Chat</Typography>
        </Box>
        </>
    )
    return (
        <>
        <Box sx={{display:'flex',flexDirection:'column', width:{xs:'100%', sm:'55%'}, height:'91vh'}}>

            <Box sx={{zIndex:2, width:'100%', bgcolor:'paleturquoise', boxShadow:2, height:'9vh', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Avatar sx={{width:'46px', height:'46px', mx:2}}></Avatar>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center' ,alignItems: 'flex-start'}}>
                    <Typography sx={{fontFamily:'monospace', fontWeight:600 , fontSize: { xs: '16px', sm: '18px', lg: '20px' }, lineHeight:1.2}}>{profile?.name}</Typography>
                    <Typography sx={{fontFamily:'monospace', fontWeight:300, fontSize:{ xs: '12px', sm: '15px', lg: '16px' }, color:'gray', lineHeight:1}}>{profile?.email}</Typography>
                </Box>
                <IconButton onClick={handleProfile}  sx={{justifySelf:'flex-end', m:2}}> <CallMade/> </IconButton>
            </Box>

            <Box sx={{width:'100%',  height:'74vh', display:'flex', flexDirection:'column', overflowY:'scroll', }}>
                {messages.map((m)=>{
                    return (
                        <Message socket={socket} data={m} myid={details?._id} key={m?._id}/>
                    )
                })}
                <div ref={last}></div>
            </Box>

            <Box sx={{width:'100%', border:'2px solid darkgray', boxShadow:2 ,height:'9vh', display:'flex', alignItems:'center'}}>
                <TextField label='New Message' value={text} onChange={(e)=>{settext(e.target.value)}} size="small" sx={{mx:1, width:'85%'}}></TextField>
                <IconButton onClick={handleSend} sx={{mx:2}}> <Send/> </IconButton>
            </Box>

        </Box>
        </>
    )
}

export default ChatWindow;