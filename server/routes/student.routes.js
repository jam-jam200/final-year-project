const express = require("express");
const studentController = require("../controllers/studentController");
const studentAuthController = require("../controllers/studentAuthController");
const router = express.Router();

router.post("/signup", studentAuthController.signup);

router
  .route("/")
  .get(studentController.getAllStudent)
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
