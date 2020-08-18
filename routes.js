const express = require('express');
const router = express.Router();
const User = require('./model/Users');

router.get('/', (req, res) => {
  res.render('index', {
    data: {},
    message: '',
  });
});

router.post('/send', (req, res) => {
  const { username, wish } = req.body;

  if (!User.isRegistered(username)) {
    return res.render('index', {
      data: req.body,
      message: 'You are not registered!',
    });
  }

  if (!User.isChild(username)) {
    return res.render('index', {
      data: req.body,
      message: 'You are above the age limit which is 10 years old!',
    });
  }

  return res.render('index', {
    data: req.body,
    message: 'Wish sent!',
  });
  
});

module.exports = router;
