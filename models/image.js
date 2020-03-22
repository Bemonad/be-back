const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  urls: [String],
});

module.exports = mongoose.model('Image', imageSchema );
