const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    content: {
      type: String,
    },
    Creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sujet: {
      type: Schema.Types.ObjectId,
      ref: 'Sujet',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reply', replySchema);
