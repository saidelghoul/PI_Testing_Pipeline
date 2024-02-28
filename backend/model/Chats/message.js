const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },
    receiver: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User' 
        },
    message: String,
    dateCreation: {
         type: Date, 
         default: Date.now 
        },
});
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
