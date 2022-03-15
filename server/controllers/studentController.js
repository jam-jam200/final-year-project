const Student = require("../models/studentModel");

exports.getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      status: "success",
      message: "all students",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get all students",
    });
  }
};
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "student gotten",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get all students",
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body).then();

    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent",
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,  
    });
    res.status(200).json({
      status: "success",
      data: {
        student
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update student",
    });
  }
};
exports.deleteStudent = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "deleted",
  });
};
//courses
exports.getAllCourses = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "courses",
  });
};
exports.getCourse = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "courses",
  });
};
exports.deleteCourse = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "course deleted",
  });
};
