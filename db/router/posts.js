const express = require("express");
const Post = require("../modals/post");
const Router = express.Router();
const uuid = require("uuid");
const authenticateToken = require("../middleware/auth");

// Create post
Router.post("/posts/", authenticateToken, (req, res) => {
  const newPost = new Post(req.body);
  newPost
    .save()
    .then(() => {
      res.status(201).send("new post is added");
    })
    .catch((err) => {
      res.status(400);
      console.error("Error:" + err);
    });
});

// Get posts by post id
Router.get("/posts/:id", authenticateToken, (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400);
      console.error("Error:" + err);
    });
});

// Delete post by id
Router.delete("/posts/:id", authenticateToken, (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).send("Post deleted successfully");
    })
    .catch((err) => {
      res.status(400);
      console.error("Error:" + err);
    });
});

// Update by id
Router.put("/posts/:id", authenticateToken, (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedPost) => {
      res.status(200).send(updatedPost);
    })
    .catch((err) => {
      res.status(400);
      console.error("Error:" + err);
    });
});

// Like or dislike a post
Router.put("/posts/:id/like", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("Post not found");
    } else if (!post.Likes.includes(req.body.userName)) {
      // here the user name is of who is going to like
      post.Likes.push(req.body.userName); //like
      await Post.updateOne(post);
      res.status(200).send("post is liked");
    } else {
      // dislike
      post.Likes = post.Likes.filter((item) => item !== req.body.userName);
      await Post.updateOne(post);
      res.status(200).send("post is disliked");
    }
  } catch (err) {
    res.status(400);
    console.error("Error:" + err);
  }
});

// Comment
Router.put("/posts/:id/comment", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("Post not found");
    } else {
      post.Comments.push({
        commentId: uuid.v4(),
        userName: req.body.userName,
        Comment: req.body.Comment,
      });
      await Post.updateOne(post);
      res.status(200).send("post is commented");
    }
  } catch (err) {
    res.status(400);
    console.error("Error:" + err);
  }
});

// Delete comment
Router.put(
  "/posts/:id/comment/:commentId",
  authenticateToken,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        res.status(404).send("Post not found");
      } else {
        post.Comments = post.Comments.filter(
          (item) => item.commentId !== req.params.commentId
        );
        await Post.updateOne(post);
        res.status(200).send("comment is deleted");
      }
    } catch (err) {
      res.status(400);
      console.error("Error:" + err);
    }
  }
);

module.exports = Router;
