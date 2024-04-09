var express = require("express");
var router = express.Router();
var pageController = require("../controller/PageController");
const upload =require("../middleware/upload");
const path = require('path');


router.get("/getall", pageController.getall);

router.get("/getbyid/:id", pageController.getbyid);

router.post("/add", upload.fields([{name:'profileImage',maxCount:1},{name:'coverImage',maxCount:1}]),pageController.add);
router.delete("/remove/:id", pageController.remove);

router.put("/update/:id",upload.fields([{name:'profileImage',maxCount:1},{name:'coverImage',maxCount:1}]), pageController.update);

router.post('/:pageId/participer',pageController.participerAuGroupe);
router.get('/:pageId/participants', pageController.getAllParticipantsPage);

module.exports = router;
