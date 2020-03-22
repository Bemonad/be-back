const express = require('express');
const router = express.Router();
const crud = require('../services/crud');
const usersRouter = require('./users');
const Room = require('../models/room');
const Booking = require('../models/booking');
const Image = require('../models/image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome' });
});

usersRouter(router);

router.use('/rooms', crud(Room));
router.use('/bookings', crud(Booking));
router.use('/images', crud(Image));

module.exports = router;
