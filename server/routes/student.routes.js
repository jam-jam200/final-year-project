const express = require("express");
const studentController = require("../controllers/studentController");
const studentAuthController = require("../controllers/studentAuthController");
const teacherAuthController = require("../controllers/teacherAuthController");
const router = express.Router();

router.post("/signup", studentAuthController.signup);
router.post("/login", studentAuthController.login);

router
  .route("/")
  .get(
    studentAuthController.protect,
    teacherAuthController.protect,
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
