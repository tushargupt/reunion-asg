const express = require("express");
const router = express.Router();
const {
  getAllPost,
  
} = require("../controllers/postController");

router.get("/", getAllPost);


module.exports = router;
