import * as api from '../api/index';
import {ADDCOMMENT, CREATEPOST, DELETECOMMENT, DELETEPOST, GETPOST, GETPOSTS, GETUSERPOSTS, LIKEPOST, LOGOUT, SEARCHPOST} from '../constants/actiontypes';
import { useNavigate } from 'react-router-dom';

export const createPost = (formData, navigate) => async (dispatch) =>{
    try {
        const {data} = await api.createPost(formData);
        dispatch({type:CREATEPOST, payload:data});
        navigate('/');
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            const navigate = useNavigate();
            navigate('/');
        }
        console.log(error)
    }
}

export const getPosts = (flag) => async (dispatch) =>{
    try {
        const {data} = await api.getPosts(flag);
        dispatch({type:GETPOSTS, payload:{data,flag}});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            const navigate = useNavigate();
            navigate('/');
        }
        console.log(error)
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const {data} = await api.likePost(postId);
        dispatch({type:LIKEPOST,payload:data.result});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            const navigate = useNavigate();
            navigate('/');
        }
        console.log(error)
    }
};

export const getUserPosts = (id)=> async (dispatch)=>{
    try {
        const {data} = await api.getUserPosts(id);
        if(Array.isArray(data))
        dispatch({type:GETUSERPOSTS, payload:data});
        else
        dispatch({type:GETUSERPOSTS, payload:[data]});

        // console.log(data);
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            const navigate = useNavigate();
            navigate('/');
        }
        console.log(error)
    }
}

export const getPost = (id,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.getPost(id);
        dispatch({type:GETPOST, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            navigate('/');
        }
        console.log(error)
    }
};

export const deletePost = (id, navigate) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type:DELETEPOST, payload:id});
        navigate('/');
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            navigate('/');
        }
        console.log(error)
    }
}

export const addComment = (postId, data, navigate) => async(dispatch) => {
    try {
        await api.addComment(postId,data);
        dispatch({type:ADDCOMMENT, payload:{postId,data}})
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            navigate('/');
        }
        console.log(error)
    }
};

export const deleteComment = (data, navigate) => async(dispatch) => {
    try {
        await api.deleteComment(data);
        dispatch({type:DELETECOMMENT, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            navigate('/');
        }
        console.log(error)
    }
};

export const searchPosts = (input, navigate) => async(dispatch) => {
    try {
        const {data} = await api.searchposts(input);
        dispatch({type:SEARCHPOST, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT})
            navigate('/');
        }
        console.log(error)
    }
}

