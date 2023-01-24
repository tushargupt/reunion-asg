const express = require("express");
const router = express.Router();
const { unlikePost } = require("../controllers/postController");

router.post("/:id", unlikePost);


module.exports = router;