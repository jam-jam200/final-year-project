const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//seting the image path
app.use("/image", express.static(path.join(__dirname, "/public")));

app.get("/", function (req, res) {
  res.send("hello world!");
});

//running server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});
