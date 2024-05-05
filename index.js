const { Server } = require("socket.io");

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
    console.log("new connection", socket.id);
});

io.listen(3000);