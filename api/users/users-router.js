const express = require('express');
const { 
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { response } = require('express');

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
  Users.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(() => {
    return Users.getById(req.params.id)
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await Users.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log("hello")
  try {
    const result = await Users.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});


router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const result = await Posts.insert({user_id: req.params.id, text: req.text})
    res.status(201).json(result)
  }
  catch (err) {
    next(err)
  }
});

// do not forget to export the router
module.exports = router;