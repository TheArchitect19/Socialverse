import { ADDCOMMENT, CREATEPOST, DELETECOMMENT, DELETEPOST, GETPOST, GETPOSTS, GETUSERPOSTS, SEARCHPOST } from "../constants/actiontypes";

const reducer= (state={posts:[],temp:[],userPosts:[], post:{}, flag:0, searchposts:[]},action)=>{
    switch(action.type)
    {
        case CREATEPOST:
            let newTemp = state.posts;
            newTemp.unshift(action.payload)
            return {...state,posts:newTemp};

        case GETPOSTS:
            state.flag++;
            if (action.payload.flag!=0)
            {
                let newTemp=state.posts;
                if (Array.isArray(action.payload.data))
                newTemp = newTemp.concat(action.payload.data)
                else
                newTemp.push(action.payload.data)
                return {...state,posts:[... new Set(newTemp)]}
            }
            state.flag=1;
            if (Array.isArray(action.payload.data))
            return {...state,posts:action.payload.data}
            
            let newPosts=[action.payload.data];
            return {...state,posts:newPosts};

        case GETPOST:
            return {...state, post:action.payload};

        case DELETEPOST:
            return {...state, posts:state.posts.filter((p)=>p._id!=action.payload), temp:state.temp.filter((u)=>u._id!=action.payload)}
        
        case ADDCOMMENT:
            if (state?.post?._id===action.payload.postId)
            {
                return {...state, post:{...state.post, comments:[action.payload.data, ...state.post.comments]}};
            }
            return state;

        case DELETECOMMENT:
            if(state?.post?._id === action.payload.postId)
            return {...state, post:{...state.post, comments:state.post.comments.filter((c)=>c._id!=action.payload.commentId)}};
            return state;

        case SEARCHPOST:
            return {...state, searchposts:action.payload};

        default:
            return state

    }
};

export default reducer;