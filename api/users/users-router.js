const express = require('express');
const { 
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.get('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // res.json(req)
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log('req body', req.body)
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.put('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
  Users.update(req.body)
  }
  catch {next}
});

router.delete('/:id', logger, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    Users.remove(req.body)
    }
    catch {next}
});

router.get('/:id/posts', logger, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.post('/:id/posts', logger, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router;