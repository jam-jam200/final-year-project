const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(
    authController.protect,
    authController.restrictTo,
    courseController.deleteCourse
  );

router
  .route("/")
  .post(courseController.createCourse)
  .get(authController.protect, courseController.getAllCourses);

module.exports = router;
