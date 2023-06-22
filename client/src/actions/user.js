import * as api from '../api/index';
import { ADDCHAT, ADDMESSAGE, DELMESSAGE, FOLLOW, GETFRIENDS, GETMESSAGES, LOGOUT, MYPROFILE, PROFILE, RECOMMEND, SEARCHUSER, SETONLINE, UPDATEUSER } from '../constants/actiontypes';

export const getProfile = (id, navigate )=> async(dispatch)=>{
    try {
        const res = await api.getProfile(id);
        const data=res.data;
        dispatch({type:PROFILE,payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
};

export const getMyProfile = (id, navigate )=> async(dispatch)=>{
    try {
        const res = await api.getProfile(id);
        const data=res.data;
        dispatch({type:MYPROFILE,payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
};

export const getFriends = (obj, navigate)=>async(dispatch)=>{
    try {
        let list=[];
        list = list.concat(obj.followers);
        list = list.concat(obj.following);
        if(Array.isArray(obj.requests))
        list = list.concat(obj.requests);
        list=[...new Set(list)];

        const {data} = await api.getFriends({list});
        dispatch({type:GETFRIENDS,payload:{data,id:obj.id}});
        // console.log(data);
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
}

export const followUser = (id,navigate) => async(dispatch) => {
    try {
        const {data} = await api.followUser(id);
        if(data.message)
        alert(data.message)
        
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
};

export const unfollowUser = (id,navigate) => async(dispatch) => {
    try {
        const {data} = await api.unfollowUser(id);
        if(data.message)
        alert(data.message)
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
};

export const acceptFollow = (id,navigate) => async(dispatch) => {
    try {
        const {data} = await api.acceptFollow(id);
        if(data.message)
        alert(data.message);
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
};

export const deleteFollow = (id,navigate) => async(dispatch) => {
    try {
        const {data} = await api.deleteFollow(id);
        if(data.message)
        alert(data.message);
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error);
    }
};

export const addChat = (id, navigate) => async(dispatch) => {
    try {
        const {data} = await api.addChat({data:id});
        if(data.message)
        alert(data.message);
        else
        dispatch({type:ADDCHAT, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error)
    }
}

export const addMessage = (input, navigate) => async(dispatch) => {
    try {
        const {data} =  await api.sendMessage(input);
        dispatch({type:ADDMESSAGE, payload:data?.res});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error);
    }
}

export const delMessage = (cid, mid, navigate) => async(dispatch) => {
    try {
        await api.deleteMessage(cid, mid);
        dispatch({type:DELMESSAGE, payload:mid});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error);
    }
}

export const recommend = () => async(dispatch) => {
    try {
        const {data} = await api.recommend();
        dispatch({type:RECOMMEND, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
        }
        console.log(error);
    }
}

export const searchUser = (username, exact, navigate) => async(dispatch) => {
    try {
        const {data} = await api.searchuser(username, exact);
        dispatch({type:SEARCHUSER, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error);
    }
};

export const updateUser = (input, navigate) => async(dispatch) => {
    try {
        const {data} = await api.updateuser(input);
        dispatch({type:UPDATEUSER, payload:data});
    } catch (error) {
        if(error.response.data.name=='TokenExpiredError')
        {
            dispatch({type:LOGOUT});
            navigate('/');
        }
        console.log(error);
    }
};

export const getProfileforPost = async(id) => {
    try {
        const {data} = await api.getFriends({list:[id]});
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateMessages = () => async(dispatch) => {
    try {
        const {data} = await api.getMessages();
        console.log(data);
        dispatch({type:GETMESSAGES, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const getOnlineUsers = (list) => async(dispatch) => {
    try {
        const {data} = await api.getFriends({list});
        dispatch({type:SETONLINE, payload:data});
    } catch (error) {
        console.log(error);
        
    }
}
