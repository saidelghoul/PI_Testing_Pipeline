var express = require("express");
var router = express.Router();
var activityController = require("../controller/activityController");

router.get("/", activityController.getActivities);

router.get("/:id_activity", activityController.getActivityById);

router.get("/:id_activity/tasks", activityController.getTasksByActivity);

router.post("/", activityController.addActivity);

router.put("/:id_activity", activityController.updateActivity);

router.delete("/:id_activity", activityController.removeActivity);

module.exports = router;
