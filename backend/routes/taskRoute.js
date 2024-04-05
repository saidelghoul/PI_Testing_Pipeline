var express = require("express");
var router = express.Router();
var tasksController = require("../controller/taskController");

router.get("/", tasksController.getTasks);

router.get("/:id_task", tasksController.getTaskById);

router.get("/:id_task/checklists", tasksController.getCheckListsByTask);

router.post("/:id_activity", tasksController.addTaskToActivity);

router.delete("/:id_task", tasksController.deleteTask);

router.put("/:id_task", tasksController.updateTask);

//router.get("/tasks/:id", tasksController.getTasksByActivity);

module.exports = router;
