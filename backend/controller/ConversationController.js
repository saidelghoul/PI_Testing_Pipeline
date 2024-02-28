var Conversation = require("../model/Chats/conversation");
var Message = require("../model/Chats/message");

async function getAllConversations(req, res) {
  Conversation.find({})
    .populate('messages')
    .exec()
    .then((conversations) => {
      res.status(200).json(conversations);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getConversationById(req, res) {
  Conversation.findById(req.params.id)
    .populate('messages')
    .exec()
    .then((conversation) => {
      if (!conversation) res.status(404).json({ error: "Couldn't find conversation" });
      else res.status(200).json(conversation);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function addConversation(req, res) {
  const conversation = req.body;
  const newConversation = new Conversation(conversation);
  try {
    const saved = await newConversation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function removeConversation(req, res) {
  const id = req.params.id;
  try {
    const conversation = await Conversation.findByIdAndDelete(id);
    if (!conversation) res.status(404).json({ error: "Couldn't find conversation" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateConversation(req, res) {
  const id = req.params.id;
  try {
    const conversation = await Conversation.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!conversation) res.status(404).json({ error: "Couldn't find conversation" });
    else res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function addMessageToConversation(req, res) {
  const { conversationId } = req.params;
  const message = req.body;
  const newMessage = new Message(message);
  try {
    const savedMessage = await newMessage.save();

    const conversation = await Conversation.findById(conversationId);
    conversation.messages.push(savedMessage);
    await conversation.save();

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
async function getAllMessagesByContent(req, res) {
  const { conversationId } = req.params;
  const { message } = req.query;
  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      match: { message: { $regex: message, $options: 'i' } },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    if (!conversation.messages || conversation.messages.length === 0) {
      return res.status(404).json({ error: "No messages found" });
    }
    res.status(200).json(conversation.messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}


module.exports = { getAllConversations, getConversationById, addConversation, removeConversation, updateConversation, addMessageToConversation ,getAllMessagesByContent };
