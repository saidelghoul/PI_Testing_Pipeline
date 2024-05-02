const express = require("express");
const router = express.Router();

const evenementController = require("../controller/evenementController");
const commentaireController = require("../controller/commentaireController");

router.delete("/remove/:id", commentaireController.remove);

router.put("/update/:id", commentaireController.update);

router.get("/getall", evenementController.getall);
router.get("/getbyid/:id", evenementController.getbyid);

router.post("/addToPub/:id", commentaireController.addToPub);
router.post("/addToEvent/:id", commentaireController.addToEvent);
router.get("/commentPub/:id", commentaireController.getCommentByPub);
router.get("/commentEvent/:id", commentaireController.getCommentsByEvent);

router.post("/report/:id", commentaireController.reportComment);


module.exports = router;
