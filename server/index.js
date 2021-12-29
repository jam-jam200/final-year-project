const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//requiring routers
const homeRoute = require("./routes/app.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//seting the static path
app.use("/", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", homeRoute);

//running server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});
