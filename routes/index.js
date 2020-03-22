const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const roomsRouter = require('./rooms');
const bookingsRouter = require('./bookings');
const imagesRouter = require('./images');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome' });
});

usersRouter(router);
roomsRouter(router);
bookingsRouter(router);
imagesRouter(router);

module.exports = router;
