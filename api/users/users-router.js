const express = require('express');
const User = require('./users-model')
const Post = require('./../posts/posts-model')
const { validateUserId, validateUser } = require('./../middleware/middleware')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.get()
    res.status(200).json(users)
  } catch(err){
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  }).catch(next)
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  User.update(req.params.id, req.body)
  .then(updated => {
    res.status(200).json(updated)
  }).catch(next)
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;
