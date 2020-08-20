const express = require('express');
const router = express.Router();
const User = require('./model/Users');

router.get('/', (req, res) => {
  res.render('index', {
    data: {},
    message: {},
  });
});

router.post('/', async (req, res) => {
  const { username, wish } = req.body;

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

  return res.render('index', {
    data: {},
    message: {
      success: 'Wish received!'
    },
  });
});

module.exports = router;
