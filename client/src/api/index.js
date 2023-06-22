import axios from 'axios';

const baseurl = 'https://fakebook-backend.onrender.com/';
const API = axios.create({baseURL:baseurl});

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('profile'))
    req.headers.Authorization =JSON.parse(localStorage.getItem('profile')).token;
    return req;
});

export const signup = (data) =>API.post('/auth/signup',data);
export const signin = (data) =>API.post('/auth/signin',data);

export const createPost = (data) =>API.post('/post/createpost',data);
export const getPosts = (flag) =>API.get(`/post/timeline/${flag}`);
export const likePost = (postId)=>API.get(`/post/like/${postId}`);

export const getProfile = (id) =>API.get(`/user/${id}/profile`);

export const getUserPosts=(id)=> API.get(`/post/${id}/userposts`);
export const getFriends = (data) => API.post(`/user/friendsprofile`,data);

export const followUser = (id) => API.get(`/user/${id}/follow`);
export const unfollowUser = (id) => API.get(`/user/${id}/unfollow`);

export const acceptFollow = (id) => API.get(`/user/${id}/acceptfollow`);
export const deleteFollow = (id) => API.get(`/user/${id}/deletefollow`);

export const getPost = (id) => API.get(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/delete/${id}`);

export const addComment = (postId, data) => API.put(`/post/comment/${postId}`,data);
export const deleteComment = (data) => API.put(`/post/deletecomment`,data);

export const addChat = (id) => API.post(`/user/chats`, id);
export const sendMessage = (data) => API.post(`/user/chats/messages`, data);
export const deleteMessage = (cid, mid) => API.delete(`/user/chats/${cid}/messages/${mid}`);

export const recommend = () => API.get(`/user/recommend`);
export const searchuser = (username, exact) => API.get(`/user/searchuser/${username}/${exact}`);
export const searchposts = (input) => API.post(`/post/search`, input);

export const updateuser = (data) => API.put('/user/update', data);
export const getMessages = () => API.get('/user/chats');