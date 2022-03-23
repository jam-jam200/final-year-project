const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//courses
exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    status: "success",
    message: "all courses",
    results: courses.length,
    data: {
      courses,
    },
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError("No course found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "course gotten",
    data: {
      course,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body).then();

  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new AppError("No course found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that id", 404));
  }
  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
