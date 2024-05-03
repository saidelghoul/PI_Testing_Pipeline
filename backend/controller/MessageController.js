const Conversation = require("../model/Chats/conversation");
const Message = require("../model/Chats/message");

const sendMessage = async (req, res) => {
    try {
      const { conversationId } = req.params;
      const { content } = req.body;
      const { id: repondeur } = req.params;
      const sender = req.user._id;
  
      let conversation = await Conversation.findOne({
        members: { $all: [sender, repondeur] }
      });
  
      if (!conversation) {
        conversation = await Conversation.create({
          members: [sender, repondeur]
        });
      }
  
      const newMessage = new Message({
        sender,
        repondeur,
        content
      });
  
      conversation.messages.push(newMessage._id); // Utilisation de conversation.messages au lieu de Conversation.messages
  
      await conversation.save();
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
module.exports ={sendMessage};
