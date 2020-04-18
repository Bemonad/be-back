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

  router.use('/bookings', crud(Booking));
};

module.exports = bookings;
