const express = require("express");
const connectDB = require("./db/database");
const app = express();
require("dotenv").config();
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
// const {pos} = require("./routes")

// Middlewares

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect Database

connectDB();

// All routes are below

app.get("/api", (req, res) => {
  return res.send("Working");
});

// perform user authentication and return a JWT token
app.use("/api/authenticate", require("./routes/authenticateRoute"));

// authenticated user would follow user with {id}
app.use("/api/follow", protect, require("./routes/followRoute"));

// authenticated user would unfollow a user with {id}
app.use("/api/unfollow/", protect, require("./routes/unfollowRoute"));

// - authenticate the request and return the respective user profile.
//     - RETURN: User Name, number of followers & followings.
app.use("/api/user", protect, require("./routes/userRoute"));

// add a new post created by the authenticated user

app.use("/api/posts", protect, require("./routes/postsRoute"));

// delete post created by the authenticated user
app.use("/api/posts", protect, require("./routes/postsRoute"));

// like the post with {id} by the authenticated user.
app.use("/api/like", protect, require("./routes/likePostRoute"));

// unlike the post with {id} by the authenticated user.
app.use("/api/unlike", protect, require("./routes/unlikePostRoute"));

// comment the post with {id} by the authenticated user.
app.use("/api/comment", protect, require("./routes/commentsPostRoute"));

// return a single post with {id} populated with its number of likes and comments
app.use("/api/posts", protect, require("./routes/postsRoute"));

// return all posts created by authenticated user sorted by post time. Return( id, title, desc, created_at, comments, likes)
app.use("/api/all_posts", protect, require("./routes/allPostRoute"));

app.listen( process.env.PORT || 5000, () => {
  console.log("Server running on PORT 5000");
});
