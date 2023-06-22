import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateMessages } from "../../actions/user";


const Socket = ({socket}) => {
    // console.log('rendering');
    const dispatch = useDispatch();

    
    useEffect(()=>{
        const messageListen = () =>{
            console.log('calles')
            dispatch(updateMessages());
        };
        socket.on("getMessage", messageListen);
        return ()=>{
            socket.off("getMessage", messageListen);
        }
    }, [socket])

    return (<></>);
}

export default Socket;