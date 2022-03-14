const express = require("express");
const path = require("path");
const morgan = require("morgan");

//mounting routers
const homeRoute = require("./routes/app.routes");
const studentRouter = require("./routes/student.routes");
const teacherRouter = require("./routes/teacher.routes");
const { Server } = require("https");

const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
console.log(process.env.NODE_ENV);

//Routes
app.use("/", homeRoute);
app.use("/api/users/student", studentRouter);
app.use("/api/users/teacher", teacherRouter);

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//seting the static path
app.use("/", express.static(path.join(__dirname, "/public")));
module.exports = app;
