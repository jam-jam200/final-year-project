const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
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

//bodyparsers reading the data from body to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

//prevent parameter pollution
app.use(hpp());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//serving static file
app.use("/", express.static(path.join(__dirname, "/public")));

console.log(process.env.NODE_ENV);

//global middlewares
//set security http headers
app.use(helmet());

//development login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  //maximum number of IP adddress per hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

//Routes
app.use("/", homeRoute);
app.use("/api/users", studentRouter, teacherRouter);
app.use("/api/course", courseRouter);
app.use("/api/post", postRouter);
app.use("/api/usercategory", userCategories);

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
