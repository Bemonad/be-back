const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id_room: ObjectId,
  start: Date,
  end: Date,
  sit: Boolean,
  video: Boolean,
  number_people: Number,
  status: Boolean,
});

module.exports = mongoose.model('Booking', bookingSchema );
