const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../models/userModel");
// const Teacher = require("../models/teacherModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const UserCategory = require("../models/userCategories");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
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
    passwordChangedAt: req.body.passwordChangedAt,
    // passwordRestToken: req.body.passwordResetToken,
    // passwordResetExpires: req.body.passwordResetExpires,
  });

  createSendToken(newUser, 201, res);

  console.log("here i am", req.body.passwordResetExpires);
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
  createSendToken(user, 200, res);
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
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exist", 401)
    );
  }

  //check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("user recently changed password!, Please log in again", 401)
    );
  }
  console.log("=============", currentUser.changedPasswordAfter(decoded.iat));

  //grants acccess to protected route
  req.user = currentUser;
  return next();
});

exports.restrictTo = catchAsync(async (req, res, next) => {
  const category = await UserCategory.findOne({
    name: req.body.category,
  });

  if (category === "student") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }

  return next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  //get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }

  //generate the random reset token
  const resetToken = user.createPasswordResetToken();

  //send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with ypur new password and passwordConfirm to: ${resetURL}. \nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token(Valid for 10 min)",
      message,
    });

    return res.status(200).json({
      status: "sucess",
      message: "Token sent to Email",
    });
  } catch (err) {
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending this email, try again later.",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //set new password only if token has not expired and there is a user

  if (!user) {
    return next(new AppError("Token is invalid or has expired"), 400);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //update changedPasswordAt property for the current user

  //log user in by sending JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //get user from colection
  const user = await User.findById(req.user.id).select("+password");

  //check if posted current password is correct
  // if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
  //   return next(new AppError("Your current password is wrong"), 401);
  // }
  // console.log("passssssssssssssss", req.body.passwordCurrent);

  //if so, update
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //log user in, send JWT
  createSendToken(user, 200, res);
});
