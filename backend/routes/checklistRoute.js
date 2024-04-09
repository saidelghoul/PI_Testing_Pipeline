const express = require("express");
const router = express.Router();
const checkListController = require("../controller/checklistController");

router.get("/", checkListController.getCheckLists);

router.get("/:id_task/users", checkListController.getAssignedUsersForChecklist);

router.get("/:id_task/oftask", checkListController.getCheckListByTaskId);

router.get("/:id_user/checklist", checkListController.getCheckListByHolder);

router.get("/:id_checklist", checkListController.getCheckListById);

router.post("/:id_task", checkListController.createCheckList);

router.delete("/:id_checklist", checkListController.removeChecklist);

router.put("/:id_checklist", checkListController.updateChecklist);

module.exports = router;
