const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  capacity_sit: Number,
  capacity_stand: Number,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema );
