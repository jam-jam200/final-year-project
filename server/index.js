const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const app = require("./app");
const server = require("http").Server(app)
const io = require("socket.io-client")(server);

//running server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});

io.on("connection", socket => {
  socket.on("join-room", () => {
    console.log("joined room");
  })
})

