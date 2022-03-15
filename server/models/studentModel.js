const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please specify your firstname"],
    maxlength: [50, "Firstname but be less or equal to 50 characters"],
    minlength: [5, "Firstname must be more or equal to 5 characters"],
  },
  lastname: {
    type: String,
    required: [true, "please specify your lastname"],
    maxlength: [50, "Lastname but be less or equal to 50 characters"],
    minlength: [5, "Lastname must be more or equal to 5 characters"],
  },
  email: {
    type: String,
    required: [true, "please specify your email"],
    unique: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
});
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
