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
  weekNumber: Number
}, { timestamps: true });

bookingSchema.statics.findByUserId = (userId) => {
  return Booking.find({user_id: userId});
};

bookingSchema.statics.findByMonth = (date) => {
  return Booking.find({ start: { $gte: `${date}-01`, $lte: `${date}-31` } });
};

bookingSchema.statics.findByWeek = (week) => {
  return Booking.find({ weekNumber: week});
};

const Booking = mongoose.model('Booking', bookingSchema );

module.exports = Booking;
