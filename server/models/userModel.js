const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please specify your firstname"],
    maxlength: [50, "Firstname but be less or equal to 50 characters"],
    minlength: [3, "Firstname must be more or equal to 3 characters"],
  },
  lastname: {
    type: String,
    required: [true, "please specify your lastname"],
    maxlength: [50, "Lastname but be less or equal to 50 characters"],
    minlength: [3, "Lastname must be more or equal to 3 characters"],
  },
  email: {
    type: String,
    required: [true, "please specify your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
  passwordChangedAt: Date,
});

studentSchema.pre("save", async function (next) {
  //works after password is modified
  if (!this.isModified("password")) return next();
  //hash password with a cost of 12
  this.password = await bycrypt.hash(this.password, 12);
  //delete the password confirmed field
  this.passwordConfirm = undefined;
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycrypt.compare(candidatePassword, userPassword);
};

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
  }
  return false;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
