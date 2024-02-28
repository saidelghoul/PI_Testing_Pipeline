var express = require("express");
var router = express.Router();
var ConversationController = require("../controller/ConversationController");

router.get("/getall", ConversationController.getAllConversations);

router.get("/getbyid/:id", ConversationController.getConversationById);

router.post("/add", ConversationController.addConversation);
router.post("/addMeessage/:conversationId", ConversationController.addMessageToConversation);

router.get('/conversationMessages/:conversationId/messages',ConversationController.getAllMessagesByContent);

router.delete("/remove/:id", ConversationController.removeConversation);

router.put("/update/:id", ConversationController.updateConversation);


module.exports = router;
