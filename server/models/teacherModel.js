// const crypto = require("crypto");
// const mongoose = require("mongoose");
// const validator = require("validator");
// const bycrypt = require("bcryptjs");

// const teacherSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       required: [true, "please specify your firstname"],
//       maxlength: [50, "Firstname but be less or equal to 50 characters"],
//       minlength: [3, "Firstname must be more or equal to 3 characters"],
//     },
//     lastname: {
//       type: String,
//       required: [true, "please specify your lastname"],
//       maxlength: [50, "Lastname but be less or equal to 50 characters"],
//       minlength: [3, "Lastname must be more or equal to 3 characters"],
//     },
//     email: {
//       type: String,
//       required: [true, "please specify your email"],
//       unique: true,
//       lowercase: true,
//       validate: [validator.isEmail, "Please provide a valid email"],
//     },
//     photo: {
//       type: String,
//       default: "",
//     },
//     password: {
//       type: String,
//       required: [true, "please provide a password"],
//       minlength: 8,
//       select: false,
//     },
//     passwordConfirm: {
//       type: String,
//       required: [true, "please confirm your password"],
//       validate: {
//         validator: function (el) {
//           return el === this.password;
//         },
//         message: "Password are not the same",
//       },
//     },
//     passwordChangedAt: Date,
//     passwordResetToken: String,
//     passwordResetExpires: Date,
//     categoryId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "UserCategory",
//     },
//   },
//   {
//     timestamps: true, //automatically creates a createdAt, updatedAt property for each documents
//     toJSON: { virtuals: true }, //used to ref virtual objects
//     toObject: { virtuals: true }, //used to ref virtual objects
//   }
// );

// teacherSchema.pre("save", async function (next) {
//   //works after password is modified
//   if (!this.isModified("password")) return next();
//   //hash password with a cost of 12
//   this.password = await bycrypt.hash(this.password, 12);
//   //delete the password confirmed field
//   this.passwordConfirm = undefined;
// });

// teacherSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bycrypt.compare(candidatePassword, userPassword);
// };

// teacherSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return JWTTimestamp < changedTimestamp;
//   }

//   //false means not changed
//   return false;
// };

// teacherSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   //sha256 is a hashing algorithm for crypto
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   console.log({ resetToken }, this.passwordResetToken);

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

// const Teacher = mongoose.model("Teacher", teacherSchema);

// module.exports = Teacher;
