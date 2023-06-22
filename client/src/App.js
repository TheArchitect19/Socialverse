import Home from "./components/Home/Home";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import CreatePost from "./components/CreatePost/CreatePost";
import Auth from "./components/Auth/Auth";
import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from './actions/posts'
import Profile from "./components/Profile/Profile";
import Friends from './components/Profile/Friends';
import PostDetails from "./components/Post/PostDetails";
import Messenger from "./components/Messenger/Messenger";
import SearchUser from "./components/Search/SearchUser";
import SearchPost from "./components/Search/SearchPost";
import UpdateProfile from "./components/Profile/UpdateProfile";
import { recommend } from "./actions/user";
import {io} from 'socket.io-client';


function App() {
  const dispatch = useDispatch();
  // const user= JSON.parse(localStorage.getItem("profile"))?.result;
  const {authData} = useSelector((state)=>state.auth);
  console.log(authData);
  // const socket = useRef();
  const [socket, setSocket] = useState(io("https://fakebook-socket.onrender.com"));


  useEffect(()=>{
    if(authData)
    {
      dispatch(getPosts(0));
      dispatch(recommend());
    }
  },)

  useEffect(()=>{
    if(authData)
    {
      socket.emit("addUser", authData?.result?._id);
      // console.log(socket);
    }
  },[authData]);

  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetails/>} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/friends/:id" element={<Friends />} />
        <Route path="/messenger" element={<Messenger socket={socket}/>}/>
        <Route path="/searchuser" element={<SearchUser />}/>
        <Route path="/searchpost" element={<SearchPost />}/>
        <Route path="/updateprofile" element={<UpdateProfile />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
