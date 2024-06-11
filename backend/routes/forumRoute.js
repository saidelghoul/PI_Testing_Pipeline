const express = require("express");
const router = express.Router();
const ForumController = require("../controller/Forum/SujetController");
const ReplayController = require("../controller/Forum/ReplayController");


router.get("/getall", ForumController.getall);
router.get("/activites", ForumController.getallActivites);
router.post("/add", ForumController.add);
router.delete("/delete/:id", ForumController.deleteSujet);
router.put("/update/:id", ForumController.update);
router.get("/getbyid/:id", ForumController.getbyid);

router.get("/getReplay/:id", ReplayController.getallBySujet);
router.post("/addReplay/:id", ReplayController.addReplay);

module.exports = router;
