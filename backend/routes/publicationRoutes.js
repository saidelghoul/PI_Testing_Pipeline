const express = require("express");
const router = express.Router();
const publicationController = require("../controller/publicationController");
const upload = require("../middleware/upload");

router.get("/getall", publicationController.getall);

router.get("/getbyid/:id", publicationController.getbyid);

router.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  publicationController.add
);

router.delete("/delete/:id", publicationController.remove);

router.put("/update/:id", publicationController.update);

router.post("/like/:id", publicationController.likePost);

router.post("/deslike/:id", publicationController.deslikePost);

router.post("/report/:id", publicationController.reportPost);

module.exports = router;
