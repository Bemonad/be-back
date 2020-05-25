const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  start: Date,
  end: Date,
  sit: Boolean,
  video: Boolean,
  number_people: Number,
  status: Boolean,
  weekNumber: Number
}, { timestamps: true }); 

bookingSchema.pre('save', async function (next) {
  const booking = this;
  if (typeof booking.room === 'string') {
    booking.room = ObjectId(booking.room)
  }
  if (typeof booking.user === 'string') {
    booking.user = ObjectId(booking.user)
  }
  next()
});

bookingSchema.statics.findByUserId = (userId) => {
  return Booking.find({user: ObjectId(userId)});
};

bookingSchema.statics.findByMonth = (date) => {
  return Booking.find({ start: { $gte: `${date}-01`, $lte: `${date}-31` } });
};

bookingSchema.statics.findByWeek = (week) => {
  return Booking.find({ weekNumber: week});
};

const Booking = mongoose.model('Booking', bookingSchema );

module.exports = Booking;
