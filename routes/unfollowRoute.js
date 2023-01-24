const express = require("express");
const router = express.Router();
const { unfollowUser } = require("../controllers/unfollowController");

router.post("/:id", unfollowUser);


module.exports = router;