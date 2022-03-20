const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await User.find();

  res.status(200).json({
    status: "success",
    message: "all teachers",
    results: teachers.length,
    data: {
      teachers,
    },
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await User.findById(req.params.id);
  if (!teacher) {
    return next(new AppError("No teacher found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    message: "teacher gotten",
    data: {
      teacher,
    },
  });
});

exports.createTeacher = catchAsync(async (req, res, next) => {
  const newTeacher = await User.create(req.body).then();

  res.status(201).json({
    status: "success",
    data: {
      student: newTeacher,
    },
  });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const teacher = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!teacher) {
    return next(new AppError("No teacher found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      teacher,
    },
  });
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
  const teacher = await User.findByIdAndDelete(req.params.id);
  if (!teacher) {
    return next(new AppError("No teacher found with that id", 404));
  }
  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
