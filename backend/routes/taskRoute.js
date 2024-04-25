const express = require("express");
const router = express.Router();
const tasksController = require("../controller/taskController");

router.get("/", tasksController.getTasks);

router.get("/users", tasksController.getUsersForTask);

router.get("/:id_task", tasksController.getTaskById);
//below is unused, it has been put in checklist route
//to hold more data about the checklist holder(optimization)
router.get("/:id_task/checklists", tasksController.getCheckListsByTask);

router.get("/:id_activity/ofactivity", tasksController.getTasksByActivityId);

router.post("/:id_activity", tasksController.addTaskToActivity);

router.delete("/:id_task", tasksController.deleteTask);

router.put("/:id_task", tasksController.updateTask);

module.exports = router;
