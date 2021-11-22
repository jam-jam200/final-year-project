const { application } = require("express");
const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("hello world!");
});

//running server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});
