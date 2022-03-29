const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgetPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updatemypassword",
  authController.protect,
  authController.updatePassword
);
router.patch("/updateme", authController.protect, teacherController.updateMe);
router.delete("/deleteme", authController.protect, teacherController.deleteme);

router.route("/").post(teacherController.createTeacher);
router.route("/all/:categoryId").get(teacherController.getAllTeachers);

router
  .route("/:id/posts")
  .post(authController.protect, postController.createPost);

router.get(
  "/me",
  authController.protect,
  teacherController.getMe,
  teacherController.getTeacher
);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
