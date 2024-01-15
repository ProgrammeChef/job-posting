const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nextdb');

module.exports = mongoose;
