const express = require("express");
const router = express.Router();
const evenementController = require("../controller/evenementController");
const upload = require("../middleware/upload");

router.get("/getall", evenementController.getall);

router.get("/getbyid/:id", evenementController.getbyid);

router.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  evenementController.add
);

router.delete("/remove/:id", evenementController.remove);

router.put("/update/:id", evenementController.update);

router.post("/like/:id", evenementController.likePost);

router.post("/deslike/:id", evenementController.deslikePost);

router.post("/report/:id", evenementController.reportPost);

router.post("/reservation/:id", evenementController.CreateReservation);

module.exports = router;
