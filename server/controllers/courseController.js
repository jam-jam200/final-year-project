const Course = require("../models/courseModel");
//courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      status: "success",
      message: "all courses",
      results: courses.length,
      data: {
        courses,
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

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body).then();

    res.status(201).json({
      status: "success",
      data: {
        student: newCourse,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to update course",
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
