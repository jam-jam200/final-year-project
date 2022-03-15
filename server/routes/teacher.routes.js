const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
// const courseController = require("../controllers/courseController");

// router.param("id", (req, res, next, val) => {
//   console.log(`the id is ${val}`);
//   next();
// });

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);


module.exports = router;
