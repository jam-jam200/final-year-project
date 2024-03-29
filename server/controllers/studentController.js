const User = require("../models/userModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Student = require("../models/userModel");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllStudent = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    message: "all users",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "user gotten",
    data: {
      user,
    },
  });
});

exports.createStudent = catchAsync(async (req, res, next) => {
  const newStudent = await User.create(req.body).then();
  res.status(201).json({
    status: "success",
    data: {
      user: newStudent,
    },
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that id", 404));
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

exports.getMe = (req, res, next) => {
  req.params.id;
  next();
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  //create error if user posted password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update, please use /updatemypassword",
        400
      )
    );
  }
  //update user document, filtered unwanted fields that is not meant to be updated.
  const filterbody = filterObj(req.body, "firstname", "lastname", "email");
  const updateStudent = await Student.findByIdAndUpdate(
    req.user.id,
    filterbody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      student: updateStudent,
    },
  });
});

exports.deleteme = catchAsync(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
