const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const UserCategory = require("../models/userCategories");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  /**check if category exist */
  const category = await UserCategory.findOne({
    name: req.body.category,
  });

  if (!category) {
    return next(new AppError("category does not exist", 400));
  }

  /**check if user exist */
  const user = await User.findOne({
    name: req.body.email,
  });

  if (user) {
    return next(new AppError("account has been taken", 400));
  }

  /**create user */
  const newUser = await User.create({
    categoryId: category._id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  return res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please Provide Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or Password", 401));
  }

  const token = signToken(user._id);
  return res.status(200).json({
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
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please Login", 404));
  }
  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exist", 401)
    );
  }

  //check if user changed password after the token was issued
  freshUser.changedPasswordAfter(decoded.iat);

  return next();
});
