const Teacher = require("../models/teacherModel");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const newTeacher = await Teacher.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      student: newTeacher,
    },
  });
});
