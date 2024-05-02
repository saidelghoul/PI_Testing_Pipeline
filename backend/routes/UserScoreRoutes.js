const express = require("express");
const router = express.Router();
const UserScoreController = require("../controller/UserScoreController");

router.get("/getEventReportbyid/:id", UserScoreController.getEventReportbyid);
router.get("/getEventLiketbyid/:id", UserScoreController.getEventLiketbyid);
router.get(
  "/getEventDesliketbyid/:id",
  UserScoreController.getEventDesliketbyid
);

router.get("/getPubReportsbyid/:id", UserScoreController.getPubReportsbyid);
router.get("/getPubLiketbyid/:id", UserScoreController.getPubLiketbyid);
router.get("/getPubtDesliketbyid/:id", UserScoreController.getPubtDesliketbyid);



module.exports = router;
