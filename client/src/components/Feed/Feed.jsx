import { Box } from "@mui/system"
import { useEffect, useRef } from "react";
import Post from "./Post";
import { ArrowUpward } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";

import {useDispatch, useSelector} from 'react-redux';
import { getPosts } from "../../actions/posts";
import LoadMore from "./LoadMore";

const Feed = ({user}) => {

  const dispatch = useDispatch();

  const {posts} = useSelector((state)=>state.posts); 
  const start = useRef();
  
  // console.log(posts)
  return (
    <>
      <Box sx={{
        width:{xs:'95%',sm:'55%'},
        display:'block',
        height:'91vh',
        overflowY:'scroll',
        
      }} >

        <div ref={start}></div>
        
        {
          posts.map((p,i)=><Post user={user} post={p} key={`${i}key`}/>)
        }


        {posts.length>1 && (
          <>
        <LoadMore/>
          <div style={{positon:'absolute', top:'10vh',zIndex:999,width:'10%',margin:'1% 45%'}}>
            <IconButton onClick={()=>start.current.scrollIntoView({behavior:'smooth'})}>
              <Avatar sx={{backgroundColor:'gray'}}><ArrowUpward/></Avatar>
            </IconButton>
          </div>
          </>
        )}


      </Box>
    </>
  )
}

export default Feed