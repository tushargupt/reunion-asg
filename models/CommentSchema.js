const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
