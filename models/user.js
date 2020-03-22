const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    role: String,
});

module.exports = mongoose.model('User', userSchema );
