import { Circle, Loupe } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonBase, IconButton, TextField, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addChat } from "../../actions/user";

const Chat = ({set, data, curr}) => {
    const selected = curr==data?._id;

    const handleClick = () => {
        set(data?._id);
    }
    
    useEffect(()=>{

    },[curr]);
    return (
        <>
        <Box sx={{width:'95%', mx:'2.5%', boxShadow:2, borderRadius:'10px' , my:1.5, border: selected?'4px solid aqua':'none'}}>
            <ButtonBase sx={{width:'100%'}} onClick={handleClick}>
                <Box sx={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'left', alignItems:'center'}}>
                    <Avatar sx={{height:50, width:50, m:2}} src={data?.profilepicture}></Avatar>
                    <Box sx={{display:'flex', width:'60%', flexDirection:'column',justifyContent:'center' ,alignItems: 'flex-start'}}>
                        <Typography sx={{fontFamily:'monospace', fontWeight:600 , fontSize: { xs: '16px', sm: '20px', lg: '23px' }, lineHeight:1.2}}>{data?.name}</Typography>
                        <Typography sx={{fontFamily:'monospace', fontWeight:300, fontSize:{ xs: '13px', sm: '16px', lg: '18px' }, color:'gray', lineHeight:1}}>{data?.email}</Typography>
                    </Box>
                    
                </Box>
            </ButtonBase>
        </Box>
        </>
    )
}

const Chats = ({setCurr, details, curr}) => {
    const {friendsProfile} = useSelector((state)=> state?.user);
    const friendInfo = friendsProfile?.data;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [text, setText] = useState("");

    const handleAdd = () => {
        const temp = friendInfo?.filter((f)=> f?.email==text);
        
        if(temp.length>0)
        {
            const id = temp[0]?._id;
            console.log(id);
            dispatch(addChat(id, navigate));
        }
        else
        alert('No Friend with that Username!')
    }

    const handleRefresh = () => {
        setCurr("");
    }

    const handleChange = (e) => {
        setText(e.target.value);
    } 

    
    return (
        <>
        <Box sx={{width:{xs:'100%', sm:'45%', my:3}, display:'block', height:'91vh', overflowY:'scroll'}}>
            <Box sx={{display:'flex', flexDirection:'row', m:1, justifyContent:'left'}}>
                <TextField size="small" value={text} label='UserName to Add' onChange={handleChange} sx={{width:'50%'}}/>
                <IconButton onClick={handleAdd}> <Loupe sx={{color:'green'}}/></IconButton>
                <Button onClick={handleRefresh}> Refresh</Button>
            </Box>
            <Box>
                {
                    details?.chat?.map((c)=>{
                        const profile = friendInfo?.filter((p)=> p?._id==c);
                        return (
                            <Chat set={setCurr} data={profile && profile[0]} curr={curr} key={c} />
                        )
                    })
                }
            </Box>
        </Box>
        </>
    )
}

export default Chats;