const express = require("express");
const User = require("./users-model");
const Post = require("./../posts/posts-model");
const { validateUserId, validateUser, validatePost } = require("./../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId, (req, res, next) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUser, validateUserId, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then((number) => {
      number === 1
        ? res.status(200).json(req.user)
        : res.send(`${number} records were deleted`);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  try {
    const posts = await User.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/posts", validatePost, validateUserId, async (req, res, next) => {
  try {
    const newPost = await Post.insert({user_id: req.params.id, text: req.body.text})
    res.status(200).json(newPost)
  } catch (err) {
    next(err)
  } 

});

// do not forget to export the router

module.exports = router;
