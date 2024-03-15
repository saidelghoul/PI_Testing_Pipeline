var express = require("express");
var router = express.Router();
var evenementController = require("../controller/evenementController");

router.get("/getall", evenementController.getall);

router.get("/getbyid/:id", evenementController.getbyid);

router.post("/add", evenementController.add);

router.delete("/remove/:id", evenementController.remove);

router.put("/update/:id", evenementController.update);

router.delete("/remove2/:id", evenementController.remove2);

router.post("/:id/commentaires", evenementController.addComment);

module.exports = router;
