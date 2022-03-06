const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.param("id", (req, res, next,     val) => {
  console.log(`the id is ${val}`);
  next();
});

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .get(teacherController.getAllCourses)
  .post(teacherController.createCourse)
  .post(teacherController.createTeacher);

router
  .route("/course/:id")
  .get(teacherController.getTeacher)
  .get(teacherController.getCourse)
  .patch(teacherController.updateTeacher)
  .patch(teacherController.updateCourse)
  .delete(teacherController.deleteCourse)
  .delete(teacherController.deleteTeacher);

module.exports = router;
