const express = require('express');
const router = express.Router();
const User = require('./model/Users');
const Post = require('./model/Post');

router.get('/', (req, res) => {
  res.render('index', {
    data: {},
    message: {},
  });
});

router.post('/', async (req, res) => {
  const { username } = req.body;

  if (!(await User.isRegistered(username))) {
    return res.render('index', {
      data: req.body,
      message: {
        error: 'You are not registered!'
      },
    });
  }

  if (!(await User.isChild(username))) {
    return res.render('index', {
      data: req.body,
      message: {
        error: 'You are above the age limit which is 10 years old!'
      },
    });
  }

  Post.save(req.body);
  return res.render('index', {
    data: {},
    message: {
      success: 'Wish received!'
    },
  });
});

module.exports = router;
