const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SujetSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    Creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    replays:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Reply"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sujet', SujetSchema);
