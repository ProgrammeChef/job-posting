const mongoose = require('../db');

const user = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', user);

module.exports = User;
