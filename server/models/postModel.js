const mongoose = require("mongoose");
// const User = require("../models/userModel");

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
  },
  {
    toJSON: { virtuals: true }, //used to ref virtual objects
    toObject: { virtuals: true }, //used to ref virtual objects
  },
  {
    timestamps: true,
  }
);

postSchema.pre(/^find/, function(next){
  this.populate({
    path: "user",
    select: "firstname lastname"
  })
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
