const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  buffer: Buffer,
  id_checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CheckList",
  },
});

module.exports = mongoose.model("Document", docSchema);
