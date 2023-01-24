const Post = require("../models/PostModel");
const Comment = require("../models/CommentSchema");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getPost = async (req, res) => {
  try {
    var findPost = Post.find({ _id: req.params._id }, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error getting post" });
      }
      console.log(findPost);
      // return res.json({
      //   likes: findPost.likes,
      //   comments: findPost.comments,
      // });
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllPost = async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.id;

  const findUser = await User.findOne({ currentUser });

  console.log(findUser);
  try {
    Post.find({ user: req.user._id })
      .sort({ created_at: -1 })
      .populate("comments")
      .populate("likes")
      .exec((err, posts) => {
        if (err) {
          return res.status(500).json({ message: "Error getting all posts" });
        }

        return res.json(
          posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              desc: post.description,
              created_at: post.created_at,
              comments: post.comments.map((comment) => comment.comment),
              likes: post.likes.length,
            };
          })
        );
      });
  } catch (error) {
    console.log(error);
  }
};
const addPost = async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.id;

  const findUser = await User.findOne({ currentUser });

  console.log(findUser);
  try {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      user: findUser._id,
    });

    post.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error creating post" });
      }

      return res.json({
        post_id: post._id,
        title: post.title,
        description: post.description,
        created_at: post.created_at,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const deletePost = async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.id;

  const findUser = await User.findOne({ currentUser });

  console.log(findUser);
  try {
    Post.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting post" });
      }

      return res.json({ message: "Successfully deleted post" });
    });
  } catch (error) {
    console.log(error);
  }
};
const likePost = async (req, res) => {
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

    const findUser = await User.findOne({ currentUser });

    console.log(findUser);

    Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: findUser._id } },
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error liking post" });
        }

        return res.json({ message: "Successfully liked post" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const unlikePost = async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.id;

  const findUser = await User.findOne({ currentUser });

  console.log(findUser);
  try {
    Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error unliking post" });
        }

        return res.json({ message: "Successfully unliked post" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const commentsPost = async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = decoded.id;

  const findUser = await User.findOne({ currentUser });

  console.log(findUser);
  try {
    const comment = new Comment({
      post: req.params.id,
      comment: req.body.comment,
      user: req.user._id,
    });

    comment.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Error commenting on post" });
      }

      Post.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment._id } },
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error commenting on post" });
          }

          return res.json({
            comment_id: comment._id,
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPost,
  getAllPost,
  addPost,
  deletePost,
  likePost,
  unlikePost,
  commentsPost,
};
