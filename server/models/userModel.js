const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema(
  {
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
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserCategory",
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Student",
    // },
  },
  {
    // timestamps: true, //automatically creates a createdAt, updatedAt property for each documents
    toJSON: { virtuals: true }, //used to ref virtual objects
    toObject: { virtuals: true }, //used to ref virtual objects
  }
);

studentSchema.pre("save", async function (next) {
  //works after password is modified
  if (!this.isModified("password")) return next();
  //hash password with a cost of 12
  this.password = await bycrypt.hash(this.password, 12);
  //delete the password confirmed field
  this.passwordConfirm = undefined;
  return next();
});

studentSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  return next();
});

studentSchema.pre(/^find/, function (next) {
  //points to the next query
  this.find({ active: { $ne: false } });
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // console.log("my password is=====",userPassword);
  return await bycrypt.compare(candidatePassword, userPassword);
};

studentSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

studentSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  //false means not changed
  return false;
};

studentSchema.methods.createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  //sha256 is a hashing algorithm in crpto
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 20 * 60;
  console.log(
    { resetToken },
    this.passwordResetToken,
    this.passwordResetExpires
  );

  return resetToken;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
