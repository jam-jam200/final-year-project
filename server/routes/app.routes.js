const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res, next) => {
  res.render("index.ejs", {
    title: "Talkmore",
  });
});
router.get("/category", (req, res, next) => {
  res.render("category.ejs", {
    title: "Category",
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
router.get("/room", (req, res, next) => {
  res.redirect(`/${uuidv4()}`);
});
router.get("/:room", (req, res, next) => {
  res.render("room.ejs", {
    title: "TalkMore",
    roomId: req.params.room,
  });
});

module.exports = router;
