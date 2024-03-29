const Teacher = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const UserCategory = require("../models/userCategories");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.find({
    categoryId: req.params.categoryId,
  }).populate({ path: "categoryId", select: "name _id" });

  res.status(200).json({
    status: "success",
    message: "all teachers",
    results: teachers.length,
    data: {
      teachers,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id;
  next();
};

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
  const updateTeacher = await Teacher.findByIdAndUpdate(
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
      teacher: updateTeacher,
    },
  });
});

exports.deleteme = catchAsync(async (req, res, next) => {
  await Teacher.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createTeacher = catchAsync(async (req, res, next) => {
  const teacherCategory = await UserCategory.findOne({
    name: req.body.category,
  });

  if (!teacherCategory) {
    return next(new AppError("category does not exist", 400));
  }
  // console.log(teacherCategory);
  const newTeacher = await Teacher.create(req.body);

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
