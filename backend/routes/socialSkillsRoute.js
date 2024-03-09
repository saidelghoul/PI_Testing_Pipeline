var express = require("express");
var router = express.Router();
var socialSkillController = require("../controller/socialSkillController");

router.get("/getall", socialSkillController.getallSocialSkills);

router.get("/getbyid/:id", socialSkillController.getSocialSkillbyid);

router.post("/add", socialSkillController.addSocialSkill);

router.delete("/remove/:id", socialSkillController.removeSocialSkill);

router.put("/update/:id", socialSkillController.updateSocialSkill);

router.put('/assign/:userId', socialSkillController.assignSocialSkillToUser);

router.put('/unassign/:userId', socialSkillController.unassignSocialSkillFromUser);

module.exports = router;
