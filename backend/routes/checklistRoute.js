var express = require("express");
var router = express.Router();
var checkListController = require("../controller/checklistController");

router.get("/", checkListController.getCheckLists);

router.get("/:id_checklist", checkListController.getCheckListById);

router.get("/users", checkListController.getUsersForChecklist);

router.post("/:id_task", checkListController.createCheckList);

router.delete("/:id_checklist", checkListController.removeChecklist);

router.put("/:id_checklist", checkListController.updateChecklist);

module.exports = router;
