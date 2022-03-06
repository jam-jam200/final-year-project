const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router
  .route("/")
  .get(studentController.getAllStudent)
  .get(studentController.getAllCourses)
  .post(studentController.createStudent);

router
  .route("/course/:id")
  .get(studentController.getStudent)
  .get(studentController.getCourse)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteCourse)
  .delete(studentController.deleteStudent);

module.exports = router;
