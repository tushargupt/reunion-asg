const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email,password);

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all details !" });
  }
  try {
    const findUser = await User.findOne({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      return res.status(200).json({
        token: generateToken(findUser._id),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Error Signin user. Please try again later !" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = {
  signInUser,
};
