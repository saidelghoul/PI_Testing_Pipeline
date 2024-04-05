var express = require("express");
var router = express.Router();
var evenementController = require("../controller/evenementController");
var commentaireController=require ("../controller/commentaireController")
router.get("/getall", evenementController.getall);

router.get("/getbyid/:id", evenementController.getbyid);
router.post("/addToPub/:id", commentaireController.addToPub);
router.post("/addToEvent/:id", commentaireController.addToEvent);
router.get("/commentPub/:id", commentaireController.getCommentByPub);

router.post("/add", evenementController.add);

router.delete("/remove/:id", evenementController.remove);

router.put("/update/:id", evenementController.update);

module.exports = router;
