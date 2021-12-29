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
router.get("/contact_info", (req, res, next) => {
  res.render("contact.ejs", {
    title: "Contact Information",
  });
});
router.get("/sign-up", (req, res, next) => {
  res.render("signup.ejs", {
    title: "Sign Up",
  });
});
router.get("/login", (req, res, next) => {
  res.render("login.ejs", {
    title: "Login",
  });
});
router.get("/dashboard", (req, res, next) => {
  res.render("dashboard.ejs", {
    title: "Dashboard",
  });
});
router.get("/courses", (req, res, next) => {
  res.render("courses.ejs", {
    title: "Courses",
  });
});
router.get("/lecturer", (req, res, next) => {
  res.render("lecturer.ejs", {
    title: "Lecturers",
  });
});
router.get("/:room", (req, res, next) => {
  res.render("room.ejs", {
    title: "TalkMore",
  });
});
module.exports = router;
