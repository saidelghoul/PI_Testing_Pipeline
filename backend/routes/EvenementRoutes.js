const express = require("express");
const router = express.Router();
const evenementController = require("../controller/evenementController");

router.get("/getall", evenementController.getall);

router.get("/getbyid/:id", evenementController.getbyid);

router.post("/add", evenementController.add);

router.delete("/remove/:id", evenementController.remove);

router.put("/update/:id", evenementController.update);
router.post("/reservations/:eventId", evenementController.createReservation);

module.exports = router;
