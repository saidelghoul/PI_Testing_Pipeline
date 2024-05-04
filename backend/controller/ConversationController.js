var Conversation = require("../model/Chats/conversation");
var Message = require("../model/Chats/message");
const User = require("../model/user");

async function getAllConversations(req, res) {
  try {
    const conversations = await Conversation.find({}).
    populate({
      path: 'messages',
      select: 'createdAt' // Sélectionnez les champs à afficher
    }) 
      .exec();
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur : " + error.message });
  }
}


async function getConversationById(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id).populate('messages', 'content').exec();

    if (!conversation) {
      return res.status(404).json({ error: "Couldn't find conversation" });
    }

    if (conversation.messages.length === 0) {
      return res.status(404).json({ error: "No messages found in the conversation" });
    }
    conversation.messages.sort((a, b) => a.createdAt - b.createdAt);

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
async function getMessage(req, res) {
  const conversationId = req.params.conversationId;
  try {
    const messages = await Message.find({ conversation: conversationId })// Utilisez { createdAt: -1 } pour trier par ordre décroissant
                                  .populate({path:'sender',
                                            select:'name'});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur : " + error.message });
  }
}


async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
async function addConversation(req, res) {
  const { members, creator: connectedUserId, name } = req.body;

  // Vérifier si au moins un membre est fourni
  if (!members || members.length < 1) {
    return res.status(400).json({ error: "Veuillez fournir au moins un membre pour créer une conversation" });
  }

  try {
    // Vérifier s'il existe déjà une conversation entre ces membres
    const existingConversation = await Conversation.findOne({
      members: { $all: [connectedUserId, ...members] }
    });

    // Si une conversation existe déjà, renvoyer une erreur
    if (existingConversation) {
      return res.status(400).json({ error: "Une conversation avec ces membres existe déjà" });
    }

    // Créer une nouvelle conversation avec le nom spécifié
    const conversation = {
      name: name, // Utiliser le nom spécifié dans la requête
      members: [connectedUserId, ...members],
      creator: connectedUserId // Définir le créateur de la conversation comme l'utilisateur connecté
    };
    const newConversation = new Conversation(conversation);
    const saved = await newConversation.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Erreur:", err);
    return res.status(500).json({ error: "Erreur du serveur " + err.message });
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
async function removeMessage(req, res) {
  const id = req.params.id;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) res.status(404).json({ error: "Couldn't find message" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
async function updateConversation(req, res) {
  const id = req.params.id;
  const { name } = req.body; // Extraire le nom de la conversation de req.body
  try {

    
    const conversation = await Conversation.findByIdAndUpdate(id, { name }, { new: true });
    if (!conversation) {
      return res.status(404).json({ error: "Couldn't find conversation" });
    }
    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateConversationMembres(req, res) {
  const id = req.params.id;
  const { newMemberId } = req.body; // Extraire l'ID du nouvel utilisateur de req.body

  try {
    // Trouver la conversation existante
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return res.status(404).json({ error: "Couldn't find conversation" });
    }

    // Vérifier si le nouvel utilisateur est déjà membre de la conversation
    if (conversation.members.includes(newMemberId)) {
      return res.status(400).json({ error: "L'utilisateur que vous essayez d'ajouter est déjà membre de cette conversation" });
    }

    // Ajouter le nouvel utilisateur à la conversation
    if (newMemberId) {
      const userToAdd = await User.findById(newMemberId); // Supposons que vous avez un modèle User
      if (!userToAdd) {
        return res.status(404).json({ error: "Couldn't find user to add" });
      }
      conversation.members.push(newMemberId);
      await conversation.save();
    }

    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

async function sendMessage(req, res) {
  const { conversationId } = req.params;
  const { message  } = req.body;
  const {userId} = req.body;

  try {
    // Recherchez la conversation dans la base de données
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Créez un nouveau message avec le contenu et l'ID de l'utilisateur
    const newMessage = new Message({
      content: message,
      sender: userId,
      conversationId: conversationId
    });

    // Enregistrez le nouveau message dans la base de données
    const savedMessage = await newMessage.save();

    // Ajoutez le message à la conversation
    conversation.messages.push(savedMessage._id);
    await conversation.save();

    // Émettre le message aux clients connectés à cette conversation via Socket.IO
 
      req.app.io.to(conversationId).emit("message", savedMessage);
  
    
    return res.status(201).json({ message: "Message sent successfully", conversation });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Server error" });
  }
}


 async function getMessagesByConversationId  (req, res) {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({ conversationId });
    console.log('ID de la conversation : ', conversationId);
    console.log('Nombre de messages trouvés : ', messages.length);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages de la conversation : ', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages de la conversation' });
  }
};
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


module.exports = { getAllConversations,removeMessage,getMessagesByConversationId,getMessage,sendMessage,updateConversationMembres, getUsers,getConversationById, addConversation, removeConversation, updateConversation ,getAllMessagesByContent };
