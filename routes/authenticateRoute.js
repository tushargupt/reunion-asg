const express = require("express");
const router = express.Router();
const { signInUser } = require("../controllers/authenticateController");

router.post("/", signInUser);


module.exports = router;