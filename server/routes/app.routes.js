const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index.ejs", {
    title: "Talkmore",
  });
});
router.get("/get_started", (req, res, next) => {
  res.render("getStarted.ejs", {
    title: "Get Started",
  });
});

module.exports = router;
