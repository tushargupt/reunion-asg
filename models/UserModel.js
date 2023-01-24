const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: [true, "Please add name !"] },
    email: {
      type: String,
      require: [true, "Please add an email !"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password !"],
      min: [6, " Password should be >= 6"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
