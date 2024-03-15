var express = require("express");
var router = express.Router();
var commentaireController = require("../controller/commentaireController");

router.get("/getall", commentaireController.getall);

router.post("/add", commentaireController.add);

router.delete("/remove/:id", commentaireController.remove);

router.put("/update/:id", commentaireController.update);

module.exports = router;
