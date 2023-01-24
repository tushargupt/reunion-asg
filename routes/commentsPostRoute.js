const express = require("express");
const router = express.Router();
const { commentsPost } = require("../controllers/postController");

router.post("/:id", commentsPost);


module.exports = router;