var express = require("express");
var router = express.Router();
var pageController = require("../controller/PageController");

router.get("/getall", pageController.getall);

router.get("/getbyid/:id", pageController.getbyid);

router.post("/add", pageController.add);

router.delete("/remove/:id", pageController.remove);

router.put("/update/:id", pageController.update);

router.post("/getalls/:pageId/participer/:userId", pageController.participer);
router.get('/:pageId/participants', pageController.getAllParticipantsPage);

module.exports = router;
