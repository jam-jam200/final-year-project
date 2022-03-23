const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

//mounting routers
const homeRoute = require("./routes/app.routes");
const studentRouter = require("./routes/student.routes");
const teacherRouter = require("./routes/teacher.routes");
const courseRouter = require("./routes/course.routes");
const postRouter = require("./routes/post.routes");
const userCategories = require("./routes/userCategory.routes");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/", homeRoute);
app.use("/api/users", studentRouter, teacherRouter);
app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);
app.use("/api/usercategory", userCategories);
//seting the static path
app.use("/", express.static(path.join(__dirname, "/public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
