const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);
router
  .route("/")
  .post(courseController.createCourse)
  .get(
    authController.protect,
    authController.protect,
    courseController.getAllCourses
  );

module.exports = router;
