const mongoose = require('mongoose');

const resetPasswordTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now() + 3600000, // 1 hour
    required: true,
  },
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);

module.exports = ResetPasswordToken;
