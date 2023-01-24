const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  });

module.exports = mongoose.model("Post", postSchema);