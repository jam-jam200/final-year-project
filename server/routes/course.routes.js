const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const teacherAuthController = require("../controllers/teacherAuthController");
const studentAuthController = require("../controllers/studentAuthController");

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);
router
  .route("/")
  .post(courseController.createCourse)
  .get(
    studentAuthController.protect,
    teacherAuthController.protect,
    courseController.getAllCourses
  );

module.exports = router;
