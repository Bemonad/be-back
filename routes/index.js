const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./rooms');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome' });
});

usersRouter(router);

roomsRouter(router);

module.exports = router;
