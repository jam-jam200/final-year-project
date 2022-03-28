const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory")
const User = require("../models/userModel");
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
  res.status(200).json({
    status: "success",
    message: "post gotten",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.params.id
  const newPost = await Post.create(req.body).then();

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

exports.deletePost = factory.deleteOne(Post)
