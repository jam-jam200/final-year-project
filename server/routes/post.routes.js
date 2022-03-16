const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const teacherAuthController = require("../controllers/teacherAuthController");
const studentAuthController = require("../controllers/studentAuthController");

router
  .route("/")
  .get(
    studentAuthController.protect,
    teacherAuthController.protect,
    postController.getAllPosts
  )
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .delete(postController.deletePost);

module.exports = router;
