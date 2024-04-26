var express = require("express");
var router = express.Router();
var notification = require("../controller/notificationController");

router.get('/getalls/:groupId', notification.afficherNotifications);
router.put('/update/:notifId', notification.Accpeter);
router.put('/reject/:notifId', notification.Refuser);
router.get('/historiques/creator/:id', notification.getHistoriquesByCreatorId);


module.exports = router;
