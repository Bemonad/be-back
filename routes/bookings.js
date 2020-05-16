const Booking = require('../models/booking');
const crud = require('../services/crud');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const bookings = (router) => {

  router.use('/bookings', async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      try {
        jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findByJWT(token);
        if (user) {
          next();
        } else {
          res.status(401).json({msg: 'You need to log in.'});
        }
      } catch (e) {
        res.status(401).json({msg: 'You need to log in.'});
      }
    }
  });

  router.get('/bookings', async (req, res, next) => {
    if (req.query.user) {
      const userBookings = await Booking.findByUserId(req.query.user).populate('room');
      if (userBookings.length > 0) {
        res.status(200).json(userBookings)
      } else {
        res.status(404).json("No books found")
      }
    } else {
      next()
    }
  });

  router.get('/bookings', async (req, res, next) => {
    if (req.query.date) {
      const monthBookings = await Booking.findByMonth(req.query.date);
      if (monthBookings.length > 0) {
        res.status(200).json(monthBookings)
      } else {
        res.status(404).json("No books found for this month")
      }
    } else {
      next()
    }
  });

  router.get('/bookings', async (req, res, next) => {
    if (req.query.week) {
      const weekBookings = await Booking.findByWeek(req.query.week);
      if (weekBookings.length > 0) {
        res.status(200).json(weekBookings)
      } else {
        res.status(404).json("No books found for this week")
      }
    } else {
      next()
    }
  });

  router.use('/bookings', crud(Booking));
};

module.exports = bookings;
