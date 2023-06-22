import React, { useEffect, useRef, useState } from 'react';
import {Box, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getPosts} from '../../actions/posts';
import ReactLoading from 'react-loading'

const LoadMore = () => {

  const dispatch = useDispatch();
  const {flag} = useSelector((state)=>state.posts);

    const [loading, setLoading] = useState(false);
    const handleClick = () => {
      setLoading(true);
      dispatch(getPosts(flag));
    }

    useEffect(()=>{
      setLoading(false);
    }, [flag])

  return (
    // <div ref={ref}>LoadMore</div>
    <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
      {
        !loading && (
          <Button variant='outlined' sx={{}} onClick={handleClick}>Load More Posts</Button>
        )
      }
      {
        loading && (
          <ReactLoading type='balls' color='cyan'></ReactLoading>
        )
      }
    </Box>
  )
}

export default LoadMore