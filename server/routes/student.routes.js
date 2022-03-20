const express = require("express");
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(
    authController.protect,
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
