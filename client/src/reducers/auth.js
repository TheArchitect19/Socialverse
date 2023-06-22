import { AUTH, LOGOUT } from "../constants/actiontypes";

const reducer= (state={authData:JSON.parse(localStorage.getItem('profile'))},action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile',JSON.stringify(action?.payload));
            return {authData:action?.payload};
        
            case LOGOUT:
                localStorage.clear();
                window.location.reload();
                return {authData:null};
        default:
            return state;
    }
};

export default reducer;