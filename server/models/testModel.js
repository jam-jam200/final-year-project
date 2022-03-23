const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const passwordReset = require("./passwordReset");

const testSchema = new mongoose.Schema({
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
  passwordChangedAt: {
    type: Date,
  },
});
const test = mongoose.model("test", testSchema);
module.exports = test;
