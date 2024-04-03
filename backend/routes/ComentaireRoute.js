var express = require("express");
var router = express.Router();
var commentaireController = require("../controller/commentaireController");

router.delete("/remove/:id", commentaireController.remove);

router.put("/update/:id", commentaireController.update);

router.post("/addToPub/:id", commentaireController.addToPub);

router.post("/addToEvent/:id", commentaireController.addToEvent);

router.get("/getCommentsByEvent/:id", commentaireController.getCommentsByEvent);

router.get("/getCommentsByPub/:id", commentaireController.getCommentsByPub);

module.exports = router;
