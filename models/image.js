const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id_room: String,
  url: String,
});

module.exports = mongoose.model('Image', imageSchema );
