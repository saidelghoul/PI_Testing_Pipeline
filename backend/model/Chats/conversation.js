const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
  const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;