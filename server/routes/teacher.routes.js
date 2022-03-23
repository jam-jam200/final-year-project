const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const authController = require("../controllers/authController");

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

router.route("/").post(teacherController.createTeacher);
router.route("/all/:categoryId").get(teacherController.getAllTeachers);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
