const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, "please specify course code"],
    unique: true,
  },
  courseName: {
    type: String,
    required: [true, "please specify course name"],
    unique: true,
    maxlength: [30, "course name but be less or equal to 30 characters"],
    minlength: [10, "course name must be more or equal to 10 characters"],
  },
  imageCover: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // categoryId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "UserCategory",
  // },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
