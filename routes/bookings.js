const Booking = require('../models/booking');
const crud = require('../services/crud');

const bookings = (router) => {
  router.use('/bookings', crud(Booking));
};

module.exports = bookings;
