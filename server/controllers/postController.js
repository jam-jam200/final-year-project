const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    message: "all post",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "post gotten",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body).then();

  res.status(201).json({
    status: "success",
    data: {
      student: newPost,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that id", 404));
  }

  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
