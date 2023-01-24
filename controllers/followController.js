const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const followUser = async (req, res) => {
  try {
    const Id = mongoose.Types.ObjectId(req.params.id);

    

    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = decoded.id;

    if (!Id) {
      return res.status(400).json({ message: "user id required !" });
    }

    const findUser = await User.findOne({ currentUser });

    console.log(findUser);

    User.findByIdAndUpdate(findUser._id, { $push: { followers: Id } }, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error followers user" });
      }
    });

    User.findByIdAndUpdate(
      findUser._id,
      { $push: { followings: Id } },
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error following user" });
        }

        return res.json({ message: "Successfully followed user" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  followUser,
};
