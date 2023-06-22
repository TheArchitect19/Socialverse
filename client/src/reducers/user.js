import { ADDCHAT, ADDMESSAGE, DELMESSAGE, EXTRA, GETFRIENDS, GETMESSAGES, GETUSERPOSTS, MYPROFILE, PROFILE, RECOMMEND, SEARCHUSER, SETONLINE, UPDATEUSER} from "../constants/actiontypes";

const reducer= (state={profile:{},mydetails:{},userPosts:[], friends:{},friendsProfile:{}, recommend:[], searchuser:[], online:[]}, action)=>{
    switch(action.type)
    {
        case PROFILE:
            return{...state,profile:action.payload};

        case GETUSERPOSTS:
            return {...state, userPosts:action.payload};

        case EXTRA:
            // console.log(action.payload)
            return {...state, friends:action.payload};

        case GETFRIENDS:
            return {...state, friendsProfile:action.payload};

        case MYPROFILE:
            return {...state, mydetails:action.payload};

        case ADDCHAT:
            return {...state, mydetails:{...state.mydetails, chat:action.payload.chat}};

        case ADDMESSAGE:
            return {...state, mydetails:{...state.mydetails, messages:[...state.mydetails.messages, action.payload]}};

        case DELMESSAGE:
            return {...state, mydetails:{...state.mydetails, messages:state.mydetails.messages.filter((m)=>m?._id!=action.payload)}};

        case RECOMMEND:
            return {...state, recommend:action.payload};

        case SEARCHUSER:
            return {...state, searchuser:action.payload};

        case UPDATEUSER:
            return {...state, mydetails:action.payload};

        case GETMESSAGES:
            return {...state, mydetails:{...state.mydetails, chat:action.payload.chat, messages:action.payload.messages}};

        case SETONLINE:
            return {...state, online:action.payload};

        default:
            return state;

    }
};

export default reducer;