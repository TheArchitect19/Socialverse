import { AppBar, Container, Toolbar, Typography, Avatar, IconButton, Box } from '@mui/material';
import { Adb, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useEffect, useState } from 'react';

const Navbar = ({user,setUser}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {mydetails} = useSelector((state)=>state.user);

  const handleLogout = () =>{
    dispatch(logout(navigate));
    setUser(null);
  };

  useEffect(()=>{

  }, [mydetails, user])

  return (
    <>
      <AppBar position='static' sx={{height:'9vh', display:'flex', alignItems:'center', background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)'}} >
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
          }}>
            <Box sx={{
              display:'flex',
              alignItems:'center'
            }}>
              <Adb sx={{ mr: 1 }} />
              <Typography component={Link} to='/' variant='h6' noWrap sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                letterSpacing: '.2rem',
                textDecoration: 'none',
                fontSize:{xs:'14px',md:'18px',lg:'22px'}
              }}>
                FakeBook
              </Typography>
            </Box>

            {mydetails && (
              <Box sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-around'
              }}>
                <Avatar src={mydetails?.profilePicture} alt={user?.name} sx={{width:{xs:'20px',md:'28px',lg:'36px'},height:{xs:'20px',md:'28px',lg:'36px'}}}/>

                <Typography component={Link} to='/profile/this' variant='h6' noWrap sx={{
                  mr:1,
                  ml:2,
                  fontSize:{xs:'12px',md:'16px',lg:'20px'},
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight:600,
                  fontFamily:'monospace'
                }}>
                  {mydetails?.name}
                </Typography>
                
                <IconButton color='secondary' onClick={handleLogout}>
                  <Logout fontSize='medium' />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navbar