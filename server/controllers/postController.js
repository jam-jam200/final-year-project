const Post = require("../models/postModel");
//courses
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      message: "all post",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get all post",
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "post gotten",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get post",
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body).then();

    res.status(201).json({
      status: "success",
      data: {
        student: newPost,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data, unable to post",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to delete post",
    });
  }
};
