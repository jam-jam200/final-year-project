const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllStudent = catchAsync(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    message: "all students",
    results: students.length,
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new AppError("No student found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "student gotten",
    data: {
      student,
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body).then();
  res.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(new AppError("No student found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
 const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new AppError("No student found with that id", 404));
  }

  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
//courses
exports.getAllCourses = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedfield = ["courseCode"];
  excludedfield.forEach((el) => delete queryObj[el]);
  // const queryString =  JSON.stringify(queryObj)
  // queryString.replace
  const query = Course.find(queryObj);
  const course = await query;

  // const course = await Course.find();

  res.status(200).json({
    status: "success",
    message: "all courses",
    results: course.length,
    data: {
      course,
    },
  });
});

exports.getCourse = catchAsync(async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "course gotten",
    data: {
      course,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "deleted",
    data: null,
  });
});
