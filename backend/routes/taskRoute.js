const express = require("express");
const router = express.Router();
const tasksController = require("../controller/taskController");

router.get("/", tasksController.getTasks);

router.get("/users", tasksController.getUsersForTask);

router.get("/:id_task", tasksController.getTaskById);

router.get("/:id_task/checklists", tasksController.getCheckListsByTask);

router.post("/:id_activity", tasksController.addTaskToActivity);

router.delete("/:id_task", tasksController.deleteTask);

router.put("/:id_task", tasksController.updateTask);

module.exports = router;
