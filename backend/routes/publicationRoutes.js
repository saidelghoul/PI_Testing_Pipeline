var express = require("express");
var router = express.Router();
var publicationController = require("../controller/publicationController");

router.get("/getall", publicationController.getall);

router.get("/getbyid/:id", publicationController.getbyid);

router.post("/add", publicationController.add);

router.delete("/delete/:id", publicationController.remove);

router.put("/update/:id", publicationController.update);

router.post("/:id/commentaires",publicationController.addComment);

module.exports = router;
