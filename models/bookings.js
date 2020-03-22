const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: ObjectId,
  id_room: ObjectId,
  start: Date,
  end: Date,
  sit: Boolean,
  video: Boolean,
  number_people: Number,
  status: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema );
