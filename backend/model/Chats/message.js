const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
