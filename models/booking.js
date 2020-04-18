const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: String,
  id_room: String,
  start: Date,
  end: Date,
  sit: Boolean,
  video: Boolean,
  number_people: Number,
  status: Boolean,
}, { timestamps: true });

bookingSchema.statics.findByUserId = (userId) => {
  return Booking.find({user_id: userId});
};

const Booking = mongoose.model('Booking', bookingSchema );

module.exports = Booking;
