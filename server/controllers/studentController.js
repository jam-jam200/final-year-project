const Student = require("../models/studentModel");
const Course = require("../models/courseModel");

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
      message: "error, cannot get student",
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
        student,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update student",
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to delete student",
    });
  }
};
//courses
exports.getAllCourses = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedfield = ["courseCode"];
    excludedfield.forEach(el => delete queryObj[el])
    // const queryString =  JSON.stringify(queryObj)
    // queryString.replace
    const query = Course.find(queryObj);
    const course = await query

    // const course = await Course.find(); 

    res.status(200).json({
      status: "success",
      message: "all courses",
      results: course.length,
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get all courses",
    });
  }
};
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "course gotten",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "error, cannot get course",
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to delete course",
    });
  }
};
