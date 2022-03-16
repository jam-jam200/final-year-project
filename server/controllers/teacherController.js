const Teacher = require("../models/teacherModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.find();

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
  const teacher = await Teacher.findById(req.params.id);
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
  const newTeacher = await Teacher.create(req.body).then();

  res.status(201).json({
    status: "success",
    data: {
      student: newTeacher,
    },
  });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
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
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) {
    return next(new AppError("No teacher found with that id", 404));
  }
  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
