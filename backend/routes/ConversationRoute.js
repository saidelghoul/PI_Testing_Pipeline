var express = require("express");
var router = express.Router();
var ConversationController = require("../controller/ConversationController");
const  authenticateUser  = require('../middleware/requireAuth');

router.get("/getall", ConversationController.getAllConversations);

router.get("/getbyid/:id", ConversationController.getConversationById);

router.post("/add", ConversationController.addConversation);
router.get('/users', ConversationController.getUsers);

router.get('/conversationMessages/:conversationId/messages',ConversationController.getAllMessagesByContent);

router.delete("/remove/:id", ConversationController.removeConversation);
router.delete("/removeMessage/:id", ConversationController.removeMessage);

router.post('/conversation/:conversationId/send', ConversationController.sendMessage);
router.get('/getMessage/:conversationId',ConversationController.getMessagesByConversationId)
router.put("/update/:id", ConversationController.updateConversation);
router.put("/updateMembres/:id", ConversationController.updateConversationMembres);
router.get('/getMessageById/:conversationId',ConversationController.getMessage)


module.exports = router;
