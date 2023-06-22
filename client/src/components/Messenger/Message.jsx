import { Avatar, Box, Typography, ButtonBase, IconButton} from "@mui/material";
import React, {useState} from "react";
import {Delete, Info} from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delMessage } from "../../actions/user";

const Message = ({data, myid, socket}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMine = data?.senderId==myid;
    const temp = data?.time?.split("T");
    const date = temp[0];
    const time = temp[1].split(".")[0];
    const [timeVis, setTimeVis] = useState(false);

    const style={
        display:'flex',
        flexDirection:'column',
        alignItems:isMine?'end':'start',
        alignSelf:isMine?'end':'start',
        borderRadius:'10px',
        
        bgcolor:isMine?'aquamarine':'lavender',

        m:1,
        ml:isMine?7:1,
        mr:isMine?1:7,
    }

    const handleDel = () => {
        dispatch(delMessage(data?.chatId, data?._id, navigate));
        socket.emit("message", {senderId:myid, receiverId:data?.chatId})
    }

    return (
        <>
        <Box sx={style}>
            <Typography sx={{m:0.1, mx:2, fontFamily:'monospace'}}>{data?.text}</Typography>
            <Box sx={{mx:1}}>
                
                        <IconButton onClick={handleDel} size="small" sx={{m:0}}> <Delete sx={{fontSize:'medium'}}></Delete></IconButton>
                
                <IconButton onClick={()=>setTimeVis(!timeVis)} size="small" sx={{m:0}}><Info sx={{fontSize:'medium'}}></Info></IconButton>
            </Box>
            {
                timeVis && (<Typography sx={{m:0.1, mx:2}}>{`${time.slice(0,5)}  ${date}`}</Typography>)
            }
        </Box>
        </>
    )
}

export default Message;
