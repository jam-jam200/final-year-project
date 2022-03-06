const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const app = require("./app");

//running server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server is listening to http://localhost:${PORT}`);
});

