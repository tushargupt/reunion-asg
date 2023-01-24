const express = require("express");
const router = express.Router();
const {
  addPost,
  deletePost,
  getPost,
} = require("../controllers/postController");

router.post("/", addPost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);

module.exports = router;
