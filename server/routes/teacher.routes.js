const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const teacherAuthController = require("../controllers/teacherAuthController");

router.post("/signup", teacherAuthController.signup);
router.post("/login", teacherAuthController.login);

router
  .route("/")
  .get(teacherAuthController.protect, teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

module.exports = router;
