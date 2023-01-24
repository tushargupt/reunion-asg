const express = require("express");
const router = express.Router();
const { likePost } = require("../controllers/postController");

router.post("/:id", likePost);


module.exports = router;