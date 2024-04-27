var express = require("express");
var router = express.Router();
var socialSkillController = require("../controller/socialSkillController");

router.get("/getall", socialSkillController.getallSocialSkills);

router.get("/getbyid/:id", socialSkillController.getSocialSkillbyid);

router.post("/add", socialSkillController.addSocialSkill);

router.delete("/remove/:id", socialSkillController.removeSocialSkill);

router.put("/update/:id", socialSkillController.updateSocialSkill);

router.put('/assign/:socialSkillId/:userId', socialSkillController.assignSocialSkillToUser);

router.put('/unassign/:socialSkillId/:userId', socialSkillController.unassignSocialSkillFromUser);

router.get('/getbyuser/:userId', socialSkillController.getSocialSkillsByUser);

router.get('/availables/:userId', socialSkillController.getAvailableSocialSkills);

router.get('/users', socialSkillController.getUsersForSocialSkills)

module.exports = router;
