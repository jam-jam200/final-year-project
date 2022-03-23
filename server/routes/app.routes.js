const express = require("express");
const router = express.Router();
const { v4: uuidV4 } = require("uuid");

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
router.get("/courseview", (req, res, next) => {
  res.render("courseView.ejs", {
    title: "course view",
  });
});

router.get("/contact_info", (req, res, next) => {
  res.render("contact.ejs", {
    title: "Contact Information",
  });
});
router.get("/signup", (req, res, next) => {
  res.render("signup.ejs", {
    title: "Sign Up",
  });
});
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up.ejs", {
    title: "Sign Up",
  });
});
router.get("/login", (req, res, next) => {
  res.render("login.ejs", {
    title: "Login",
  });
});
router.get("/log-in", (req, res, next) => {
  res.render("loginNow.ejs", {
    title: "Login",
  });
});
router.get("/coursesLect", (req, res, next) => {
  res.render("coursesLect.ejs", {
    title: "courses",
  });
});
router.get("/courseView", (req, res, next) => {
  res.render("courseView.ejs", {
    title: "courseView",
  });
});
// router.get("/logout", (req, res, next) => {
//   res.render(".ejs", {
//     title: "Login",
//   });
// });
router.get("/setting", (req, res, next) => {
  res.render("setting.ejs", {
    title: "Settings",
  });
});
router.get("/lectSet", (req, res, next) => {
  res.render("settingL.ejs", {
    title: "Settings",
  });
});


router.get("/forgotpassword", (req, res, next) => {
  res.render("forgotPassword.ejs", {
    title: "Forgot Password",
  });
});

router.post("forgotpassword", (req, res, next) => {
  const { email } = req.body;
  res.send(email);
});

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard.ejs", {
    title: "Dashboard",
  });
});
router.get("/dash-lect", (req, res, next) => {
  res.render("dash-lect.ejs", {
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
  res.redirect(`/${uuidV4()}`);
});

router.get("/:room", (req, res, next) => {
  res.render("room.ejs", {
    title: "TalkMore",
    roomId: req.params.room,
  });
});

module.exports = router;
