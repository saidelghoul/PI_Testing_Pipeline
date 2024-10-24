var express = require("express");
var router = express.Router();
var socialSkillController = require("../controller/socialSkillController");

router.get("/getall", socialSkillController.getallSocialSkills);

router.get("/getbyid/:id", socialSkillController.getSocialSkillbyid);

router.post("/add", socialSkillController.addSocialSkill);

router.delete("/remove/:id", socialSkillController.removeSocialSkill);

router.put("/update/:id", socialSkillController.updateSocialSkill);

router.post('/assign/:socialSkillId/:userId', socialSkillController.assignSocialSkillToUser); // Utilisez POST pour envoyer des données dans le corps de la requête

router.put('/unassign/:socialSkillId/:userId', socialSkillController.unassignSocialSkillFromUser);

router.get('/getbyuser/:userId', socialSkillController.getSocialSkillsByUser);

router.get('/availables/:userId', socialSkillController.getAvailableSocialSkills);

router.get('/users', socialSkillController.getUsersForSocialSkills);

// Route pour obtenir le nom du département par ID
router.get('/department/:idDepartement', socialSkillController.GetDepartmentNameById);

// Route pour obtenir le nom de l'unité par ID
router.get('/unite/:idUnite', socialSkillController.GetUniteNameById);

module.exports = router;
