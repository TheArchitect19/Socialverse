import { Avatar, Paper, Typography, ButtonBase } from "@mui/material";
import { Box } from "@mui/system";
import { ChevronLeft, ChevronRight, AddAPhoto, Search, Face, Email, People, Update } from "@mui/icons-material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const class1 = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
};



const Leftbar = () => {

    const [open,setOpen]= useState(false);
    const navigate = useNavigate();

    const styles = {
        width:'80%',
        height:'50px',
        m:1,
        '&:hover':{border:'4px solid aqua', borderRadius:'5px', boxShadow:9}
    }

    const Window = () => {
        return (
            <>
                <ButtonBase sx={styles} onClick={()=>navigate('/createPost')}>
                    <Paper sx={class1}>
                        <AddAPhoto />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Add Post</Typography>
                    </Paper>
                </ButtonBase>
    
                <ButtonBase sx={styles} onClick={()=>navigate('/searchuser')} >
                    <Paper sx={class1}>
                        <Search />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Search User</Typography>
                    </Paper>
                </ButtonBase>
    
                <ButtonBase sx={styles} onClick={()=>navigate('/profile/this')}>
                    <Paper sx={class1}>
                        <Face />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Profile</Typography>
                    </Paper>
                </ButtonBase>
    
                <ButtonBase sx={styles} onClick={()=>navigate('/messenger')}>
                    <Paper sx={class1}>
                        <Email />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Messenger</Typography>
                    </Paper>
                </ButtonBase>
    
                <ButtonBase sx={styles} onClick={()=>navigate('/searchpost')}>
                    <Paper sx={class1}>
                        <Search />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Search Post</Typography>
                    </Paper>
                </ButtonBase>

                <ButtonBase sx={styles} onClick={()=>navigate('/updateprofile')}>
                    <Paper sx={class1}>
                        <Update />
                        <Typography sx={{ fontFamily: 'monospace', m: 1, fontSize:{xs:'10px',md:'13px',lg:'16px'} }}>Update Profile</Typography>
                    </Paper>
                </ButtonBase>
            </>
        )
    }

    return (
        <>
            <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                width: "20%",
                backgroundColor: '#e1e3e6',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2
            }}>

                <Window />

            </Box>

            <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                width: "2.5%",
                backgroundColor: 'lightgray'
            }} >
                <Box sx={{ mt: 2, ml: -0.35, p: 0 }}>
                    <IconButton onClick={() => setOpen(true)}>
                        <Avatar sx={{ width: '18px', height: '18px', backgroundColor: 'lightblue' }}>
                            <ChevronRight fontSize="small" />
                        </Avatar>
                    </IconButton>
                </Box>

            </Box>


            {open && (
                <>
                    <Box elevation={12} sx={{
                        display: { xs: 'flex', sm: 'none' },
                        position: 'absolute',
                        height: '94vh',
                        width: '50%',
                        backgroundColor: '#e1e3e6',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: 2,
                        zIndex:700
                    }}>
                        <Window />
                    </Box>

                    <Box sx={{
                        display: { xs: 'flex', sm: 'none' },
                        width: "2.5%",
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        left: '47%',
                        zIndex:700,
                    }} >
                        <Box sx={{ mt: 2, ml: -0.35, p: 0 }}>
                            <IconButton onClick={() => setOpen(false)}>
                                <Avatar sx={{ width: '18px', height: '18px', backgroundColor: 'lightblue' }}>
                                    <ChevronLeft fontSize="small" />
                                </Avatar>
                            </IconButton>
                        </Box>

                    </Box>
                </>
            )}
        </>
    )
}

export default Leftbar