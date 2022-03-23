const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      unique: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    //   startDate: type: Date,
    //   time: Time(),
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
