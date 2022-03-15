const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router
  .route("/")
  .get(studentController.getAllStudent)
  .get(studentController.getAllCourses)
  .post(studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent);
router
  .route("/course/:id")
  .get(studentController.getCourse)
  .delete(studentController.deleteCourse)
  .delete(studentController.deleteStudent);

module.exports = router;
