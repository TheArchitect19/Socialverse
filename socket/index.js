const io = require("socket.io")(8900, {
    cors: {
        origin: '*'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user)=>user.userId==userId) && 
    users.push({userId, socketId});
    
};

const removeUser = (socketId) => {
    users = users.filter((u)=>u.socketId!=socketId);
};

const getUser = (userId) => {
    return users.find((u)=>u.userId==userId);
};

io.on("connection", (socket)=>{
    console.log('a user connected!');

    socket.on("addUser", (userId)=>{
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })
    socket.on("message", ({senderId, receiverId})=>{
        console.log(receiverId, senderId);
        const user = getUser(receiverId);
        if(user)
        io.to(user.socketId).emit("getMessage"); 
    });
    socket.on("disconnect", ()=>{
        console.log('a user disconnected!');
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})