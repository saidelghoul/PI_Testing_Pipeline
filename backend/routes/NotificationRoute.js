var express = require("express");
var router = express.Router();
var notification = require("../controller/notificationController");

router.get('/getalls/:groupId', notification.afficherNotifications);
module.exports = router;
