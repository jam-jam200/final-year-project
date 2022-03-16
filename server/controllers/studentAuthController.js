const { promisify } = require("util");
const Student = require("../models/studentModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create(req.body);

  const token = signToken(newStudent._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newStudent,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please Provide Email and Password", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError("Incorrect email or Password", 401));
  }

  const token = signToken(student._id);
  res.status(200).json({
    status: "sucess",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please Login", 404));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  next();
});
