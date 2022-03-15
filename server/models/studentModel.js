const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please specify your firstname"],
  },
  lastname: {
    type: String,
    required: [true, "please specify your lastname"],
  },
  email: {
    type: String,
    required: [true, "please specify your email"],
    unique: true,
  },
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student
