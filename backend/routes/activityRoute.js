const express = require("express");
const router = express.Router();
const activityController = require("../controller/activityController");

router.get("/", activityController.getActivities);

router.get("/:id_activity", activityController.getActivityById);

//below is unused, it has been put in task router to hold more data
//about the task's checklist holder(optimization)
router.get("/:id_activity/tasks", activityController.getTasksByActivity);

router.post("/", activityController.addActivity);

router.put("/:id_activity", activityController.updateActivity);

router.delete("/:id_activity", activityController.removeActivity);

module.exports = router;
