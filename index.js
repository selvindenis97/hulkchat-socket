const { Server } = require("socket.io");

var activeUsers = [];

const io = new Server({ cors: process.env.ORIGIN_DOMAIN });

function addUser(newUser) {
    if (!activeUsers.some((user) => user.username === newUser.username)) {
        activeUsers.push(newUser);
    }
}

function removeUser(socket) {
    activeUsers = activeUsers.filter((user) => user.socket != socket);
}


io.on("connection", (socket) => {

    socket.on('addNewUser', (userName) => {
        addUser({ username: userName, socket: socket.id });
        console.log(activeUsers);
        io.emit("usersUpdated", activeUsers);
    })

    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log("disconnect", socket.id)
        console.log(activeUsers);
        io.emit("usersUpdated", activeUsers);
    })

    socket.on('newMessage', (message) => {
        console.log("message new", message);
        io.emit(`${message.receiverId}`, message);
    })
});

io.listen(3000);