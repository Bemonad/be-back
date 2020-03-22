const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id_room: ObjectId,
  url: String,
});

module.exports = mongoose.model('Image', imageSchema );
