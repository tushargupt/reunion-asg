const User = require("../models/UserModel");

const getUser = async (req, res) => {
  try {
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


    User.findById(findUser_id)
      .populate("followers")
      .populate("following")
      .exec((err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error getting user profile" });
        }

        return res.json({
          name: user.name,
          followers: user.followers.length,
          following: user.following.length,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
};
