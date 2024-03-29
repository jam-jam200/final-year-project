const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");


router
  .route("/")
  .get(authController.protect, postController.getAllPosts)
  .post(postController.createPost)
  .post(authController.protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .delete(postController.deletePost);

module.exports = router;
