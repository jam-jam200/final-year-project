const express = require("express");
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgetPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updatemypassword",
  authController.protect,
  authController.updatePassword
);
router.patch("/updateme", authController.protect, studentController.updateMe)

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo,
    studentController.getAllStudent
  )
  .post(studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);
router
  .route("/course/:id")
  .get(studentController.getCourse)
  .delete(studentController.deleteCourse);
router.route("/course").get(studentController.getAllCourses);

module.exports = router;
