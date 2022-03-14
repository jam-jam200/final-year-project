const dotenv = require("dotenv");
// const { Socket } = require("socket.io");

dotenv.config({ path: "../config.env" });
const app = require("./app");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

//running server
const PORT = process.env.PORT || 7000;
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log({ roomId, userId });
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});
server.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});
