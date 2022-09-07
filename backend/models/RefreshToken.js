const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
