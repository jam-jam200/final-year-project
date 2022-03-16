const Teacher = require("../models/teacherModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newTeacher = await Teacher.create(req.body);

  const token = signToken(newTeacher._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newTeacher,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please Provide Email and Password", 400));
  }

  const teacher = Teacher.findOne({ email }).select("+password");

  if (
    !teacher ||
    !(await teacher.correctPassword(password, teacher.password))
  ) {
    return next(new AppError("Incorrect email or Password", 401));
  }

  const token = signToken(teacher._id);
  res.status(200).json({
    status: "sucess",
    token,
  });
});

exports.protect = catchAsync((req, res, next) => {
  next();
});
