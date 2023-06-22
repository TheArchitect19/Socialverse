import { Avatar, Paper, Typography, ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOnlineUsers } from "../../actions/user";

const Rightbar = ({socket}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open,setOpen]= useState(false);
    const {recommend, online} = useSelector((state)=>state.user);
    const [newList, setNewList] = useState([]);

    useEffect(()=>{
        const onlineListen = (list) => {
            let newlist = list?.map((obj)=>{return obj.userId});
            setNewList(newlist);
        };
        socket.on("getUsers", onlineListen);
        return ()=>{socket.off("getusers", onlineListen);}
    }, [socket]);

    useEffect(()=>{
        dispatch(getOnlineUsers(newList));
    }, [newList]);



    const Obj = ({data}) => {
        const handleClick = () => {
            navigate(`/profile/${data?._id}`)
        }
        return (
            <>
            <ButtonBase onClick={handleClick} sx={{display:'flex', width:'97.5%', bgcolor:'white', my:0.5, mx:'1.25%', justifyContent:'left', '&:hover':{border:'2px solid aqua', borderRadius:'5px', boxShadow:5}}}>
                <Avatar src={data?.profilePicture} sx={{m:1, mr:2}}/>
                <Typography sx={{fontFamily:'monospace', fontWeight:500}}>{data?.name}</Typography>
            </ButtonBase>
            </>
        )
    }

    const Window =() =>{
        return (
            <>
            <Box sx={{width:'90%'}}>
                <Typography align="center" sx={{ fontFamily: 'monospace', fontWeight:700, m: 0.5, mt:0, fontSize:{xs:'16px',md:'18px',lg:'24px'} }}>Online Users</Typography>
                <Paper sx={{height:'40vh',backgroundColor:'#f2f4f7',width:'100%'}}>
                {
                    online?.map((u)=>{
                        return <Obj data={u}/>
                    })
                }
                </Paper>
            </Box>
            <Box sx={{width:'90%'}}>
                <Typography align="center" sx={{ fontFamily: 'monospace', fontWeight:700, m: 1, fontSize:{xs:'14px',sm:'10px',md:'16px',lg:'20px'} }}>People you may know</Typography>
                <Paper sx={{height:'30vh',backgroundColor:'#f2f4f7',width:'100%', display:'flex', flexDirection:'column', overflowY:'scroll'}}>
                    {
                        recommend?.map((d)=>{
                            return (
                                <>
                                <Obj data={d} key={`${d?._id}1232`}/>
                                </>
                            )
                        })
                    }
                </Paper>
            </Box>
            </>
        )
    }
    

    return (
        <>
            <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                width: "25%",
                backgroundColor: '#e1e3e6',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2
            }}>

                <Window/>

            </Box>

            <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                width: "2.5%",
                backgroundColor: 'lightgray'
            }} >
                <Box sx={{ mt:2,ml:-2.75,mr:0,p:0}}>
                    <IconButton onClick={() => setOpen(true)}>
                        <Avatar sx={{ width: '18px', height: '18px', backgroundColor: 'lightblue' }}>
                            <ChevronLeft fontSize="small" />
                        </Avatar>
                    </IconButton>
                </Box>

            </Box>


            {open && (
                <>
                    <Box sx={{
                        display: { xs: 'flex', sm: 'none' },
                        width: "2.5%",
                        backgroundColor: 'lightgray',
                        position: 'absolute',
                        left: '48%',
                        zIndex:'999',
                        backgroundColor:'transparent'
                    }} >
                        <Box sx={{ mt: 2, ml:-1,opacity:'1' }}>
                            <IconButton onClick={() => setOpen(false)}>
                                <Avatar sx={{ width: '18px', height: '18px', backgroundColor: 'lightblue' }}>
                                    <ChevronRight fontSize="small" />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: { xs: 'flex', sm: 'none' },
                        position: 'absolute',
                        height: '94vh',
                        width: '50%',
                        backgroundColor: '#e1e3e6',
                        flexDirection: 'column',
                        alignItems: 'center',
                        left:'50%',
                        pt: 2
                    }}>
                        <Window/>
                    </Box>
                </>
            )}
        </>
    )
}

export default Rightbar;