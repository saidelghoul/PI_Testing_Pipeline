const express = require("express");
const router = express.Router();
const publicationController = require("../controller/publicationController");

router.get("/getall", publicationController.getall);

router.get("/getbyid/:id", publicationController.getbyid);

router.post("/add", publicationController.add);

router.delete("/delete/:id", publicationController.remove);

router.put("/update/:id", publicationController.update);

router.post("/:id/commentaires", publicationController.add);

module.exports = router;
