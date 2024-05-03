var express = require("express");
const { sendMessage } = require("../controller/MessageController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.post("/send/:id",requireAuth,sendMessage)


module.exports = router;
