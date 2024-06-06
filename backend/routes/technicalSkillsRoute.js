var express = require("express");
var router = express.Router();
var technicalSkillController = require("../controller/technicalSkillController");

router.get("/getall", technicalSkillController.getallTechnicalSkills);

router.get("/getbyid/:id", technicalSkillController.getTechnicalSkillbyid);

router.post("/add", technicalSkillController.addTechnicalSkill);

router.delete("/remove/:id", technicalSkillController.removeTechnicalSkill);

router.put("/update/:id", technicalSkillController.updateTechnicalSkill);

router.put("/:userId/assign", technicalSkillController.assignTechnicalSkillToUser);

router.put("/:userId/unassign", technicalSkillController.unassignTechnicalSkillFromUser);

router.get("/:userId/skills", technicalSkillController.getTechnicalSkillsByUser);

router.get("/available/:userId", technicalSkillController.getAvailableTechnologiesForUser);

router.put("/:userId/skills/:skillId", technicalSkillController.removeUserFromTechnicalSkill);


module.exports = router;
