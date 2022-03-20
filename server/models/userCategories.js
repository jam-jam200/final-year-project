const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");

const UserCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Category already exist"],
    },
  },
  {
    timestamps: true, //automatically creates a createdAt, updatedAt property for each documents
    toJSON: { virtuals: true }, //used to ref virtual objects
    toObject: { virtuals: true }, //used to ref virtual objects
  }
);

const UserCategory = mongoose.model("UserCategory", UserCategorySchema);

module.exports = UserCategory;
