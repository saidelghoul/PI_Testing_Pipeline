var express = require("express");
var router = express.Router();
var activityController = require("../controller/activityController");

router.get("/getall", activityController.getall);

router.get("/getbyid/:id", activityController.getbyid);

router.post("/add", activityController.add);

router.delete("/remove/:id", activityController.remove);

router.put("/update/:id", activityController.update);

module.exports = router;
